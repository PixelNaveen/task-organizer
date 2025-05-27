import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";
import { auth, database } from "./firebase.js";

document.addEventListener('DOMContentLoaded', () => {
  const tasksTableBody = document.getElementById('tasksTableBody');
  const searchInput = document.getElementById('taskSearch');
  const statusFilter = document.getElementById('statusFilter');
  const priorityFilter = document.getElementById('priorityFilter');
  const noResultsMessage = document.getElementById('noResultsMessage');

  let allTasks = [];
  let currentUserId = null;

  function getStatusBadge(status, dueDate) {
    const st = status.toLowerCase();
    if (dueDate) {
      const today = new Date();
      const due = new Date(dueDate);
      today.setHours(0, 0, 0, 0);
      due.setHours(0, 0, 0, 0);
      if (st === 'pending' && due < today) {
        return '<span class="status-overdue">Overdue</span>';
      }
    }
    switch (st) {
      case 'pending':
        return '<span class="status-pending">Pending</span>';
      case 'completed':
        return '<span class="status-completed">Completed</span>';
      case 'overdue':
        return '<span class="status-overdue">Overdue</span>';
      default:
        return `<span>${status}</span>`;
    }
  }

  function getPriorityBadge(priority) {
    const p = priority.toLowerCase();
    switch (p) {
      case 'low':
        return '<span class="priority-low">Low</span>';
      case 'medium':
        return '<span class="priority-medium">Medium</span>';
      case 'high':
        return '<span class="priority-high">High</span>';
      default:
        return `<span>${priority}</span>`;
    }
  }

  function renderTasks(tasks) {
    tasksTableBody.innerHTML = '';
    if (tasks.length === 0) {
      noResultsMessage.style.display = 'block';
      return;
    } else {
      noResultsMessage.style.display = 'none';
    }

    tasks.forEach(task => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td data-label="Title">${task.title}</td>
        <td data-label="Description">${task.description}</td>
        <td data-label="Status">${getStatusBadge(task.status, task.dueDate)}</td>
        <td data-label="Due Date">${task.dueDate}</td>
        <td data-label="Priority">${getPriorityBadge(task.priority)}</td>
        <td data-label="Actions">
          <button class="btn btn-edit" data-id="${task.id}" title="Edit task">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="btn btn-delete" data-id="${task.id}" title="Delete task">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      `;
      tasksTableBody.appendChild(tr);
    });
  }

  function filterTasks() {
    const searchText = searchInput.value.trim().toLowerCase();
    const selectedStatus = statusFilter.value.toLowerCase();
    const selectedPriority = priorityFilter.value.toLowerCase();

    const filteredTasks = allTasks.filter(task => {
      const matchesTitle = task.title.toLowerCase().startsWith(searchText);

      const dynamicStatus = (() => {
        const st = task.status.toLowerCase();
        if (task.dueDate) {
          const today = new Date();
          const due = new Date(task.dueDate);
          today.setHours(0,0,0,0);
          due.setHours(0,0,0,0);
          if(st === 'pending' && due < today) return 'overdue';
        }
        return st;
      })();

      const matchesStatus = selectedStatus === 'all' || dynamicStatus === selectedStatus;
      const matchesPriority = selectedPriority === 'all' || task.priority.toLowerCase() === selectedPriority;
      return matchesTitle && matchesStatus && matchesPriority;
    });

    renderTasks(filteredTasks);
  }

  searchInput.addEventListener('input', filterTasks);
  statusFilter.addEventListener('change', filterTasks);
  priorityFilter.addEventListener('change', filterTasks);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUserId = user.uid;
      const userTasksRef = ref(database, `users/${user.uid}/tasks`);

      onValue(userTasksRef, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          allTasks = Object.entries(data).map(([id, task]) => ({
            id,
            title: task.title || '',
            description: task.description || '',
            status: task.status || '',
            dueDate: task.dueDate || '',
            priority: task.priority || ''
          }));
        } else {
          allTasks = [];
        }

        filterTasks();
      }, {
        onlyOnce: false
      });
    } else {
      currentUserId = null;
      allTasks = [];
      renderTasks(allTasks);
    }
  });
});