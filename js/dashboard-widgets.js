// === CHART: Tasks Per Day (This Week / Last Week Toggle) ===

import { auth, database } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import {
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";

let chart;
let allTasks = [];

const isDark = document.body.classList.contains("dark-theme");
const chartOptions = {
  chart: {
    type: "bar",
    height: "100%",
    toolbar: { show: false },
    background: "transparent",
    foreColor: isDark ? "#f1f1f1" : "#212529",
  },
  series: [
    {
      name: "Tasks Created",
      data: [0, 0, 0, 0, 0, 0, 0],
    },
  ],
  xaxis: {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    labels: {
      style: {
        colors: isDark ? "#f1f1f1" : "#212529",
        fontSize: "13px",
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: isDark ? "#f1f1f1" : "#212529",
        fontSize: "13px",
      },
    },
  },
  grid: { show: false },
  dataLabels: { enabled: false },
  tooltip: {
    custom: ({ series, seriesIndex, dataPointIndex, w }) => {
      const day = w.globals.labels[dataPointIndex];
      const value = series[seriesIndex][dataPointIndex];
      return `
        <div style="
          background: ${isDark ? "#2a2a2a" : "#f8f9fa"};
          padding: 8px 12px;
          border-radius: 6px;
          color: ${isDark ? "#fff" : "#212529"};
          font-size: 13px;">
          <strong>${day}</strong><br>
          Tasks Created: ${value}
        </div>`;
    },
  },
  plotOptions: {
    bar: {
      borderRadius: 8,
      columnWidth: "40%",
    },
  },
  colors: ["#0d6efd"],
};

chart = new ApexCharts(
  document.querySelector("#tasksPerDayChart"),
  chartOptions
);
chart.render();

function getWeekdayIndex(dateStr) {
  const day = new Date(dateStr).getDay(); // 0 = Sun, 1 = Mon, ...
  return day === 0 ? 6 : day - 1; // Adjust so Mon = 0, Sun = 6
}

function processChartData(tasks, week = "this") {
  const counts = [0, 0, 0, 0, 0, 0, 0];
  const now = new Date();
  const currentDay = now.getDay();
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayOffset);
  monday.setHours(0, 0, 0, 0);

  const start = new Date(monday);
  const end = new Date(monday);

  if (week === "last") {
    start.setDate(start.getDate() - 7);
    end.setDate(end.getDate() - 1);
  } else {
    end.setDate(end.getDate() + 6);
  }

  tasks.forEach((task) => {
    if (!task.createdAt) return;
    const taskDate = new Date(task.createdAt);
    taskDate.setHours(0, 0, 0, 0);
    if (taskDate >= start && taskDate <= end) {
      const index = getWeekdayIndex(task.createdAt);
      counts[index]++;
    }
  });

  chart.updateSeries([{ name: "Tasks Created", data: counts }]);
}

function displayChart(weekType) {
  processChartData(allTasks, weekType);
}

function setActiveButton(type) {
  const btnThisWeek = document.getElementById("btnThisWeek");
  const btnLastWeek = document.getElementById("btnLastWeek");

  if (type === "this") {
    btnThisWeek.classList.add("btn-primary", "active");
    btnThisWeek.classList.remove("btn-outline-primary");

    btnLastWeek.classList.remove("btn-primary", "active");
    btnLastWeek.classList.add("btn-outline-primary");

    displayChart("this");
  } else {
    btnLastWeek.classList.add("btn-primary", "active");
    btnLastWeek.classList.remove("btn-outline-primary");

    btnThisWeek.classList.remove("btn-primary", "active");
    btnThisWeek.classList.add("btn-outline-primary");

    displayChart("last");
  }
}

document.getElementById("btnThisWeek").addEventListener("click", () =>
  setActiveButton("this")
);
document.getElementById("btnLastWeek").addEventListener("click", () =>
  setActiveButton("last")
);

// === WIDGET: Recent Tasks ===

function getStatusBadgeClass(status) {
  const st = status.toLowerCase();
  switch (st) {
    case "completed":
      return "bg-success";
    case "pending":
      return "bg-secondary";
    case "in progress":
      return "bg-warning text-dark";
    case "overdue":
      return "bg-danger";
    default:
      return "bg-light text-dark";
  }
}

function loadRecentTasksWidget(tasks) {
  const recentList = document.querySelector(".recent-tasks-list");
  recentList.innerHTML = "";

  const today = new Date().setHours(0, 0, 0, 0);

  const validTasks = tasks
    .filter((task) => {
      if (!task.dueDate) return false;
      if (task.status.toLowerCase() === "overdue") return false;
      const dueDateTime = new Date(task.dueDate).setHours(0, 0, 0, 0);
      return dueDateTime >= today;
    })
    .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
    .slice(0, 5);

  validTasks.forEach((task) => {
    const badge = getStatusBadgeClass(task.status);
    const listItem = document.createElement("li");
    listItem.className =
      "list-group-item d-flex justify-content-between align-items-center";
    listItem.innerHTML = `
      ${task.title}
      <span class="badge ${badge} rounded-pill">${task.status}</span>
    `;
    recentList.appendChild(listItem);
  });
}

// === WIDGET: Upcoming Deadlines ===

function loadUpcomingDeadlines(tasks, maxDays = 7, maxTasks = 4) {
  const deadlinesList = document.querySelector(".deadlines .list-group");
  deadlinesList.innerHTML = "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingTasks = tasks
    .filter((task) => {
      if (!task.dueDate) return false;
      const dueDate = new Date(task.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      const diffDays = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= maxDays;
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, maxTasks);

  if (upcomingTasks.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "list-group-item text-center text-muted";
    emptyItem.textContent = "No upcoming deadlines";
    deadlinesList.appendChild(emptyItem);
    return;
  }

  upcomingTasks.forEach((task) => {
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));

    let badgeText = "";
    let badgeClass = "bg-info text-dark";

    if (diffDays === 0) {
      badgeText = "Today";
      badgeClass = "bg-danger";
    } else if (diffDays === 1) {
      badgeText = "Tomorrow";
      badgeClass = "bg-warning text-dark";
    } else {
      badgeText = `${diffDays} days`;
    }

    const listItem = document.createElement("li");
    listItem.className =
      "list-group-item d-flex justify-content-between align-items-center";
    listItem.textContent = task.title || "Untitled task";
    listItem.title = `Due on: ${dueDate.toLocaleDateString()}`;

    const badge = document.createElement("span");
    badge.className = `badge rounded-pill ${badgeClass}`;
    badge.textContent = badgeText;
    listItem.appendChild(badge);

    deadlinesList.appendChild(listItem);
  });
}

// === FIREBASE: Load User Tasks ===

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    const tasksRef = ref(database, `users/${uid}/tasks`);

    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      allTasks = data ? Object.values(data) : [];

      loadRecentTasksWidget(allTasks);
      loadUpcomingDeadlines(allTasks);
      setActiveButton("this"); // Default view
    });
  } else {
    console.log("No user signed in.");
  }
});

// === WIDGET: Daily Quote ===

const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");

const today = new Date().toISOString().split("T")[0];
const savedDate = localStorage.getItem("quoteDate");
const savedQuote = localStorage.getItem("quoteText");
const savedAuthor = localStorage.getItem("quoteAuthor");

if (savedDate === today && savedQuote && savedAuthor) {
  quoteText.textContent = `"${savedQuote}"`;
  quoteAuthor.textContent = savedAuthor;
} else {
  fetch("https://api.quotable.io/random")
    .then((response) => response.json())
    .then((data) => {
      quoteText.textContent = `"${data.content}"`;
      quoteAuthor.textContent = data.author || "Unknown";
      localStorage.setItem("quoteDate", today);
      localStorage.setItem("quoteText", data.content);
      localStorage.setItem("quoteAuthor", data.author || "Unknown");
    })
    .catch(() => {
      quoteText.textContent = `"Believe in yourself."`;
      quoteAuthor.textContent = "Unknown";
    });
}
