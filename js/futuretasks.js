// futuretasks.js
import { database, auth } from "./firebase.js";
import {
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString();
}

document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("#futureTasksTable tbody");

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      tbody.innerHTML =
        '<tr><td colspan="5" class="text-center">Please log in to view tasks.</td></tr>';
      return;
    }

    const tasksRef = ref(database, `users/${user.uid}/tasks`);
    onValue(tasksRef, (snapshot) => {
      const tasks = snapshot.val();
      tbody.innerHTML = "";

      if (!tasks) {
        tbody.innerHTML =
          '<tr><td colspan="5" class="text-center">No upcoming tasks found.</td></tr>';
        return;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const upcomingTasks = Object.values(tasks).filter((task) => {
        if (!task.dueDate) return false;
        const dueDate = new Date(task.dueDate);
        dueDate.setHours(0, 0, 0, 0);
        return task.status !== "completed" && dueDate >= today;
      });

      if (upcomingTasks.length === 0) {
        tbody.innerHTML =
          '<tr><td colspan="5" class="text-center">No upcoming tasks found.</td></tr>';
        return;
      }

      upcomingTasks.forEach((task) => {
        const row = document.createElement("tr");
        row.innerHTML = `
  <td data-label="Title">${task.title || ""}</td>
  <td data-label="Description">${task.description || ""}</td>
  <td data-label="Due Date">${formatDate(task.dueDate)}</td>
  <td data-label="Priority">${task.priority || ""}</td>
  <td data-label="Category">${task.category || ""}</td>
`;

        tbody.appendChild(row);
      });
    });
  });
});
