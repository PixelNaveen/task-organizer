import { auth, database } from './firebase.js';
import { onValue, ref } from 'https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js';

document.addEventListener("DOMContentLoaded", () => {
  const allCountEl = document.getElementById('allTasksCount');
  const completedCountEl = document.getElementById('completedTasksCount');
  const pendingCountEl = document.getElementById('pendingTasksCount');
  const overdueCountEl = document.getElementById('overdueTasksCount');

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const tasksRef = ref(database, `users/${user.uid}/tasks`);

      onValue(tasksRef, (snapshot) => {
        let all = 0;
        let completed = 0;
        let pending = 0;
        let overdue = 0;
        const today = new Date().toISOString().split("T")[0];

        snapshot.forEach(child => {
          const task = child.val();
          all++;

          if (task.status === "completed") {
            completed++;
          } else if (task.status === "pending") {
            pending++;
            if (task.dueDate < today) {
              overdue++;
            }
          }
        });

        allCountEl.textContent = all;
        completedCountEl.textContent = completed;
        pendingCountEl.textContent = pending;
        overdueCountEl.textContent = overdue;
      });
    }
  });
});
