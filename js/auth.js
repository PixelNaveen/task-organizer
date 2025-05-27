// auth.js
import { auth } from './firebase.js';
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

// Global function to call on login button
window.signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(() => {
      window.location.href = "dashboard.php"; // Redirect on success
    })
    .catch((error) => {
      console.error("Sign-in failed:", error.message);
      alert("❌ Google Sign-In failed.");
    });
};
