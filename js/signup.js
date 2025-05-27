import { auth, database } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  updateProfile
} from 'https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js';
import {
  ref,
  set,
  get,
  child
} from 'https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js';

const form = document.getElementById('signupForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Input values
  const fullName = document.getElementById('fullName').value.trim();
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Error labels
  const nameError = document.getElementById('nameError');
  const usernameError = document.getElementById('usernameError');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const confirmPasswordError = document.getElementById('confirmPasswordError');

  // Reset error messages
  nameError.textContent = '';
  usernameError.textContent = '';
  emailError.textContent = '';
  passwordError.textContent = '';
  confirmPasswordError.textContent = '';

  let valid = true;

  if (!fullName) {
    nameError.textContent = 'Please enter your full name.';
    valid = false;
  }

  if (!username) {
    usernameError.textContent = 'Please enter a username.';
    valid = false;
  }

  if (!email) {
    emailError.textContent = 'Email is required.';
    valid = false;
  }

  if (password.length < 6) {
    passwordError.textContent = 'Password must be at least 6 characters.';
    valid = false;
  }

  if (password !== confirmPassword) {
    confirmPasswordError.textContent = 'Passwords do not match.';
    valid = false;
  }

  if (!valid) return;

  try {
    // Check if email or username already exists
    const snapshot = await get(child(ref(database), 'users'));
    let emailExists = false;
    let usernameExists = false;

    snapshot.forEach(childSnap => {
      const data = childSnap.val();
      if (data.email === email) emailExists = true;
      if (data.username && data.username.toLowerCase() === username.toLowerCase()) usernameExists = true;
    });

    if (emailExists) {
      emailError.textContent = 'This email is already registered.';
      return;
    }

    if (usernameExists) {
      usernameError.textContent = 'This username is already taken.';
      return;
    }

    // Create Firebase Auth account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update display name
    await updateProfile(user, { displayName: fullName });

    // Save data to Firebase Database
    await set(ref(database, `users/${user.uid}`), {
      uid: user.uid,
      email: email,
      name: fullName,
      username: username,
      profilePicture: "",
      provider: 'password',
      createdAt: new Date().toISOString()
    });

    alert('✅ Account created successfully!');
    window.location.href = 'index.php';
  } catch (error) {
    alert(`❌ ${error.message}`);
  }
});

// Password toggle functionality
document.getElementById('togglePassword').addEventListener('click', () => {
  const passwordInput = document.getElementById('password');
  const eyeIcon = document.querySelector('#togglePassword .eye-icon');
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  eyeIcon.classList.toggle('slash');
});

document.getElementById('toggleConfirmPassword').addEventListener('click', () => {
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const eyeIcon = document.querySelector('#toggleConfirmPassword .eye-icon');
  const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  confirmPasswordInput.setAttribute('type', type);
  eyeIcon.classList.toggle('slash');
});