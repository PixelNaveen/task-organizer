// Import Firebase modules
import { auth, database } from './firebase.js';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  fetchSignInMethodsForEmail,
} from 'https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js';
import {
  ref,
  set,
  get,
  child,
} from 'https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js';

// Handle email/username + password login
document.getElementById('signinForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const identifier = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    let email = identifier;

    // If identifier is a username, find its corresponding email
    if (!identifier.includes('@')) {
      const usersSnapshot = await get(child(ref(database), 'users'));
      let found = false;
      usersSnapshot.forEach((user) => {
        const data = user.val();
        if (data.username && data.username.toLowerCase() === identifier.toLowerCase()) {
          email = data.email;
          found = true;
        }
      });
      if (!found) throw new Error('Username not found.');
    }

    // Attempt Firebase auth login
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save to Realtime DB if not exists
    const userRef = ref(database, `users/${user.uid}`);
    const userSnapshot = await get(userRef);

    if (!userSnapshot.exists()) {
      await set(userRef, {
        uid: user.uid,
        email: user.email,
        username: identifier.includes('@') ? '' : identifier,
        name: '',
        profilePicture: '',
        provider: 'password',
        createdAt: new Date().toISOString(),
      });
    }

    window.location.href = './php/dashboard.php';
  } catch (error) {
    console.error("Login error:", error.code, error.message);

    switch (error.code) {
      case 'auth/invalid-credential':
        alert("❌ Invalid credentials. Please check your email/username and password.");
        break;
      case 'auth/user-not-found':
        alert("❌ User not found.");
        break;
      case 'auth/wrong-password':
        alert("❌ Incorrect password.");
        break;
      case 'auth/too-many-requests':
        alert("⚠️ Too many attempts. Try again later.");
        break;
      default:
        alert(`❌ ${error.message}`);
    }
  }
});

// Handle Google Sign-In
window.signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user;

      // Check if the email already exists in DB with 'password' provider
      const usersSnapshot = await get(child(ref(database), 'users'));
      let emailRegisteredWithPassword = false;

      usersSnapshot.forEach((snap) => {
        const data = snap.val();
        if (
          data.email.toLowerCase() === user.email.toLowerCase() &&
          data.provider === 'password'
        ) {
          emailRegisteredWithPassword = true;
        }
      });

      if (emailRegisteredWithPassword) {
        await auth.signOut();
        alert("⚠️ This email is already registered with a password. Please sign in using email and password instead.");
        return;
      }

      // Store user data in Realtime DB if not already stored
      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        await set(userRef, {
          uid: user.uid,
          email: user.email,
          name: user.displayName || "",
          username: "",
          profilePicture: user.photoURL || '',
          provider: 'google',
          createdAt: new Date().toISOString(),
        });
      }

      window.location.href = './php/dashboard.php';
    })
    .catch(async (error) => {
      console.error("Google sign-in error:", error.code, error.message);

      if (error.code === 'auth/account-exists-with-different-credential') {
        const email = error.customData.email;
        try {
          const methods = await fetchSignInMethodsForEmail(auth, email);
          if (methods.includes('password')) {
            alert("⚠️ This email is already registered with a password. Please sign in using email and password instead.");
          } else {
            alert(`⚠️ Email already in use with a different sign-in method: ${methods.join(', ')}`);
          }
        } catch (fetchError) {
          console.error("Error checking sign-in methods:", fetchError.message);
          alert("❌ Could not verify existing account.");
        }
      } else {
        alert('❌ Google Sign-In failed.');
      }
    });
};

// Toggle password visibility
document.getElementById('togglePassword').addEventListener('click', () => {
  const passwordInput = document.getElementById('password');
  const eyeIcon = document.querySelector('.eye-icon');
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  eyeIcon.classList.toggle('slash');
});
