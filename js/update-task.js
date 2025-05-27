import { database, auth } from './firebase.js';
import {
  ref,
  get,
  update
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { showToast, addNotification } from './notification.js';

document.addEventListener("DOMContentLoaded", () => {
  const updateTaskForm = document.getElementById("updateTaskForm");
  const updateTaskModal = new bootstrap.Modal(document.getElementById("updateTaskModal"));

  let currentUser = null;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser = user;

      // Handle click on edit buttons
      document.body.addEventListener("click", async (e) => {
        if (e.target.closest('.btn-edit')) {
          const button = e.target.closest('.btn-edit');
          const taskId = button.getAttribute("data-id");

          const taskRef = ref(database, `users/${currentUser.uid}/tasks/${taskId}`);
          try {
            const snapshot = await get(taskRef);
            if (snapshot.exists()) {
              const task = snapshot.val();
              document.getElementById("updateTaskId").value = taskId;
              document.getElementById("updateTaskTitle").value = task.title;
              document.getElementById("updateTaskDescription").value = task.description;
              document.getElementById("updateTaskDueDate").value = task.dueDate;
              document.getElementById("updateTaskPriority").value = task.priority;
              document.getElementById("updateTaskCategory").value = task.category;

              updateTaskModal.show();
            } else {
              showToast("❌ Task not found", "danger");
            }
          } catch (error) {
            console.error("Error fetching task:", error);
            showToast("❌ Error loading task", "danger");
          }
        }
      });

      // Handle form submission for updating
      updateTaskForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const taskId = document.getElementById("updateTaskId").value;
        const updatedData = {
          title: document.getElementById("updateTaskTitle").value.trim(),
          description: document.getElementById("updateTaskDescription").value.trim(),
          dueDate: document.getElementById("updateTaskDueDate").value,
          priority: document.getElementById("updateTaskPriority").value,
          category: document.getElementById("updateTaskCategory").value,
        };

        try {
          const taskRef = ref(database, `users/${currentUser.uid}/tasks/${taskId}`);
          await update(taskRef, updatedData);

          showToast("✅ Task updated successfully!", "success");
          updateTaskForm.reset();
          updateTaskModal.hide();

          await addNotification(currentUser.uid, `Task "${updatedData.title}" updated`);
        } catch (error) {
          console.error("❌ Error updating task:", error);
          showToast("❌ Failed to update task: " + error.message, "danger");
        }
      });
    }
  });
});
