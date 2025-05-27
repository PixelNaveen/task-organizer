// firebase.js (extended)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBrXNpXUDW2mkLDLXx3tWc3VlW2eaAPSOM",
  authDomain: "task-manager-app-7b5be.firebaseapp.com",
  databaseURL: "https://task-manager-app-7b5be-default-rtdb.firebaseio.com",
  projectId: "task-manager-app-7b5be",
  storageBucket: "task-manager-app-7b5be.appspot.com",
  messagingSenderId: "884379423029",
  appId: "1:884379423029:web:fe693862df3d41082fbc7c"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

function listenToUserTasks(onTasksUpdate, onUserChange) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      onUserChange(user);
      const tasksRef = ref(database, `users/${user.uid}/tasks`);
      onValue(tasksRef, (snapshot) => {
        const data = snapshot.val();
        const taskArray = data ? Object.values(data) : [];
        onTasksUpdate(taskArray);
      });
    } else {
      onUserChange(null);
      onTasksUpdate([]); // clear tasks on sign-out
    }
  });
}

export { app, auth, database, listenToUserTasks };
