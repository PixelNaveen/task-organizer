import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { ref, remove, get } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";
import { auth, database } from "./firebase.js";
import { showToast, addNotification } from "./notification.js";

document.addEventListener('DOMContentLoaded', () => {
  const tasksTableBody = document.getElementById('tasksTableBody');

  let currentUserId = null;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUserId = user.uid;
    } else {
      currentUserId = null;
    }
  });

  tasksTableBody.addEventListener('click', async (event) => {
    const target = event.target.closest('button.btn-delete');
    if (!target) return;

    const taskId = target.getAttribute('data-id');
    if (!taskId || !currentUserId) return;

    const taskRef = ref(database, `users/${currentUserId}/tasks/${taskId}`);
    try {
      // Fetch task title for notification
      const taskSnapshot = await get(taskRef);
      const task = taskSnapshot.val();
      if (!task) {
        showToast("❌ Task not found!", "danger");
        return;
      }

      if (confirm('Are you sure you want to delete this task?')) {
        await remove(taskRef);
        showToast("🗑️ Task deleted successfully!", "danger");
        await addNotification(currentUserId, `Task "${task.title}" deleted`);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      showToast(`❌ Failed to delete task: ${error.message}`, "danger");
    }
  });
});