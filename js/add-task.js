import { database, auth } from './firebase.js';
import { ref, push, set } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { showToast, addNotification } from './notification.js';

document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("taskForm");
  const newTaskModal = document.getElementById("newTaskModal");

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      // If user not logged in, hide modal
      if (newTaskModal) {
        const modalInstance = bootstrap.Modal.getInstance(newTaskModal);
        if (modalInstance) modalInstance.hide();
      }
      return;
    }

    taskForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const title = document.getElementById("taskTitle").value.trim();
      const description = document.getElementById("taskDescription").value.trim();
      const dueDate = document.getElementById("taskDueDate").value;
      const priority = document.getElementById("taskPriority").value;
      const category = document.getElementById("taskCategory").value;

      const taskData = {
        title,
        description,
        dueDate,
        priority,
        category,
        status: "pending",
        createdAt: new Date().toISOString()
      };

      try {
        const taskRef = push(ref(database, `users/${user.uid}/tasks`));
        await set(taskRef, taskData);

        // Reset the form
        taskForm.reset();

        // Properly close modal
        const modalInstance = bootstrap.Modal.getInstance(newTaskModal);
        if (modalInstance) modalInstance.hide();

        // Clean up modal backdrop and class
        document.body.classList.remove('modal-open');
        document.querySelectorAll('.modal-backdrop').forEach(b => b.remove());

        // Show toast
        showToast("✅ Task saved successfully!", "success");

        // Add notification
        await addNotification(user.uid, `New task "${title}" added`);

      } catch (error) {
        console.error("❌ Error saving task:", error);
        showToast("❌ Error saving task: " + error.message, "danger");
      }
    });
  });
});