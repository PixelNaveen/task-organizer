<!-- header.php -->
<div class="d-flex justify-content-between align-items-center bg-white rounded-3 shadow-sm px-4 py-2 mb-4">
    <div class="d-flex align-items-center">
        <h4 class="mb-0 fw-bold">Dashboard</h4>
    </div>
    <div class="d-flex align-items-center gap-3">
        <!-- Theme Toggle Icon -->
        <button id="theme-toggle" class="btn btn-light rounded-circle shadow-sm" title="Toggle Theme">
            <span id="icon-moon" class="theme-icon" style="display:block;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" fill="#fdc431" />
                </svg>
            </span>
            <span id="icon-sun" class="theme-icon" style="display:none;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="5" fill="#ffeb3b" />
                    <g stroke="#ffeb3b" stroke-width="2">
                        <line x1="12" y1="1" x2="12" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                        <line x1="1" y1="12" x2="3" y2="12" />
                        <line x1="21" y1="12" x2="23" y2="12" />
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </g>
                </svg>
            </span>
        </button>
        <!-- Notification Bell -->
          <div class="dropdown position-relative">
  <button class="btn btn-light rounded-circle shadow-sm position-relative" id="notifBell" title="Notifications" data-bs-toggle="dropdown">
    <i class="fas fa-bell"></i>
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="notifCount" style="display: none;">
      0
    </span>
  </button>
  <ul class="dropdown-menu shadow-sm p-2" id="notifDropdown" style="width: 300px; max-height: 400px; overflow-y: auto;">
    <li class="text-center text-muted">No notifications</li>
  </ul>
</div>

        <!-- Desktop Button -->
        <button class="btn btn-primary shadow d-none d-md-flex align-items-center gap-2 px-3 py-2 rounded-pill" data-bs-toggle="modal" data-bs-target="#newTaskModal">
            <i class="fas fa-plus"></i>
            <span>New Task</span>
        </button>
        <!-- Mobile Button -->
        <button class="btn btn-primary shadow d-md-none rounded-circle p-0" style="width: 48px; height: 48px;" data-bs-toggle="modal" data-bs-target="#newTaskModal">
            <i class="fas fa-plus"></i>
        </button>
        <!-- User Avatar Dropdown -->
        <div class="dropdown">
            <a href="#" class="d-flex align-items-center text-decoration-none sidebar-link" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-user-circle me-2"></i> Profile
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li><a class="dropdown-item" href="#">My Profile</a></li>
                <li><a class="dropdown-item" href="#">Settings</a></li>
                <li>
                    <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item text-danger" href="#" id="logoutBtn">Logout</a></li>
            </ul>
        </div>
    </div>
</div>