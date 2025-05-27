import { database, auth } from './firebase.js';
import { ref, push, onValue, update } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

// Show Bootstrap toast message
export function showToast(message, type = "info") {
  const toastContainer = document.getElementById("toastContainer");
  if (!toastContainer) return;

  const toast = document.createElement("div");
  toast.className = `toast align-items-center text-white bg-${type} border-0 mb-2`;
  toast.role = "alert";
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;

  toastContainer.appendChild(toast);
  new bootstrap.Toast(toast).show();

  toast.addEventListener("hidden.bs.toast", () => toast.remove());
}

// Add notification to Firebase
export function addNotification(userId, text) {
  const notification = {
    text,
    timestamp: new Date().toISOString(),
    read: false
  };
  return push(ref(database, `users/${userId}/notifications`), notification);
}

// Initialize real-time notification system
export function initNotificationSystem() {
  document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, (user) => {
      if (!user) return;

      const notifCountEl = document.getElementById("notifCount");
      const notifDropdown = document.getElementById("notifDropdown");
      const notifBell = document.getElementById("notifBell");
      const notifRef = ref(database, `users/${user.uid}/notifications`);

      onValue(notifRef, (snapshot) => {
        const data = snapshot.val();
        const notifs = data ? Object.entries(data).reverse() : [];

        const unread = notifs.filter(([_, n]) => !n.read).length;
        notifCountEl.style.display = unread > 0 ? "inline-block" : "none";
        notifCountEl.textContent = unread > 9 ? "9+" : unread;

        // Create list items
        notifDropdown.innerHTML = unread === 0
          ? `<li class="dropdown-item text-center text-muted">No unread notifications</li>`
          : notifs
              .filter(([_, n]) => !n.read)
              .map(([key, n]) => `
                <li class="dropdown-item fw-bold" data-id="${key}" style="background-color: var(--color-card-bg); color: var(--color-text);">
                  ${n.text}<br>
                  <small class="text-muted">${new Date(n.timestamp).toLocaleString()}</small>
                </li>
              `).join("");

        // Footer link
        if (notifs.length > 0) {
          notifDropdown.innerHTML += `
            <li><a href="notifications.php" class="dropdown-item text-primary text-decoration-none">View All Notifications</a></li>
          `;
        }
      });

      // Mark notifications as read on dropdown click
      notifBell.addEventListener("click", () => {
        const notifItems = notifDropdown.querySelectorAll("li[data-id].fw-bold");
        const updates = {};

        notifItems.forEach(li => {
          const key = li.getAttribute("data-id");
          updates[`users/${user.uid}/notifications/${key}/read`] = true;
          li.classList.remove("fw-bold");
        });

        if (Object.keys(updates).length > 0) {
          update(ref(database), updates).then(() => {
            notifCountEl.style.display = "none";
            notifCountEl.textContent = "";
          });
        }
      });
    });
  });
}

// Auto-run
initNotificationSystem();
