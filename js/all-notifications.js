// notification.js

import { database, auth } from "./firebase.js";
import {
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

const notificationsList = document.getElementById("notificationsList");

function formatTimestamp(timestamp) {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toLocaleString();
}

function getNotificationType(text) {
  if (!text) return "default";
  const lowerText = text.toLowerCase();
  if (lowerText.includes("added")) return "add";
  if (lowerText.includes("deleted")) return "delete";
  if (lowerText.includes("updated")) return "update";
  return "default";
}

function getNotificationClass(type) {
  switch (type) {
    case "add":
      return "notification-add";
    case "delete":
      return "notification-delete";
    case "update":
      return "notification-update";
    default:
      return "notification-default";
  }
}

onAuthStateChanged(auth, (user) => {
  if (!user) {
    notificationsList.innerHTML =
      '<p class="text-danger">Please log in to view notifications.</p>';
    return;
  }

  const notificationsRef = ref(database, `users/${user.uid}/notifications`);

  onValue(notificationsRef, (snapshot) => {
    const data = snapshot.val();
    notificationsList.innerHTML = ""; // Clear previous notifications

    if (!data) {
      notificationsList.innerHTML =
        '<p class="text-muted">No notifications found.</p>';
      return;
    }

    // Convert object to array and sort by timestamp descending
    const notificationsArray = Object.entries(data)
      .filter(([id, notif]) => notif && notif.text) // filter out empty notifications
      .map(([id, notif]) => ({ id, ...notif }))
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    notificationsArray.forEach((notification) => {
      const type = getNotificationType(notification.text);
      const notifClass = getNotificationClass(type);

      const notifItem = document.createElement("div");
      notifItem.classList.add("list-group-item", notifClass);

      notifItem.innerHTML = `
  <div class="notification-text">${notification.text}</div>
  <span class="notification-timestamp">${formatTimestamp(
    notification.timestamp
  )}</span>
`;

      notificationsList.appendChild(notifItem);
    });
  });
});
