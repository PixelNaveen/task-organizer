<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sign Up</title>
  <link rel="stylesheet" href="../css/signup.css" />
</head>
<body>
  <div class="signup-container">
    <h2>Create an Account</h2>
    <form id="signupForm" novalidate>
      <div class="form-group">
        <input type="text" id="fullName" placeholder="Full Name" required />
        <small class="error" id="nameError"></small>
      </div>
      <div class="form-group">
        <input type="text" id="username" placeholder="Username" required />
        <small class="error" id="usernameError"></small>
      </div>
      <div class="form-group">
        <input type="email" id="email" placeholder="Email" required />
        <small class="error" id="emailError"></small>
      </div>
      <div class="form-group password-group">
        <div class="password-wrapper">
          <input type="password" id="password" placeholder="Password" required />
          <span class="toggle-password" id="togglePassword">
            <svg class="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </span>
        </div>
        <small class="error" id="passwordError"></small>
      </div>
      <div class="form-group password-group">
        <div class="password-wrapper">
          <input type="password" id="confirmPassword" placeholder="Re-enter Password" required />
          <span class="toggle-password" id="toggleConfirmPassword">
            <svg class="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </span>
        </div>
        <small class="error" id="confirmPasswordError"></small>
      </div>
      <button type="submit">Sign Up</button>
    </form>
    <p>Already have an account? <a href="../index.html">Sign In</a></p>
  </div>
  <script type="module" src="../js/signup.js"></script>
</body>
</html>