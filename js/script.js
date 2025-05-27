document.addEventListener("DOMContentLoaded", () => {
    const sidebarLinks = document.querySelectorAll(".sidebar-link");
    const bottomLinks = document.querySelectorAll(".bottom-link");

    function clearActive(links) {
        links.forEach((link) => link.classList.remove("active"));
    }

    // Mapping for sidebar to bottom nav text
    const linkTextMap = {
        "dashboard": "home",
        "my tasks": "my tasks",
        "today": "today",
        "upcoming": "upcoming",
        "settings": "settings"
    };

    // Set active state based on current URL
    const currentPath = window.location.pathname.split("/").pop() || "index.php";
    sidebarLinks.forEach((link) => {
        const linkPath = link.getAttribute("href").split("/").pop();
        if (linkPath === currentPath) {
            clearActive(sidebarLinks);
            clearActive(bottomLinks);
            link.classList.add("active");
            const sidebarText = link.textContent.trim().toLowerCase();
            const bottomText = linkTextMap[sidebarText] || sidebarText;
            bottomLinks.forEach((bLink) => {
                if (bLink.textContent.trim().toLowerCase() === bottomText) {
                    bLink.classList.add("active");
                }
            });
        }
    });
    bottomLinks.forEach((link) => {
        const linkPath = link.getAttribute("href").split("/").pop();
        if (linkPath === currentPath) {
            clearActive(bottomLinks);
            clearActive(sidebarLinks);
            link.classList.add("active");
            const bottomText = link.textContent.trim().toLowerCase();
            const sidebarText = Object.keys(linkTextMap).find(
                (key) => linkTextMap[key] === bottomText
            ) || bottomText;
            sidebarLinks.forEach((sLink) => {
                if (sLink.textContent.trim().toLowerCase() === sidebarText) {
                    sLink.classList.add("active");
                }
            });
        }
    });

    // Sidebar navigation
    sidebarLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            clearActive(sidebarLinks);
            clearActive(bottomLinks);
            link.classList.add("active");

            const sidebarText = link.textContent.trim().toLowerCase();
            const bottomText = linkTextMap[sidebarText] || sidebarText;
            bottomLinks.forEach((bLink) => {
                if (bLink.textContent.trim().toLowerCase() === bottomText) {
                    bLink.classList.add("active");
                }
            });

            const href = link.getAttribute("href");
            if (href && href !== "#") {
                window.location.href = href;
            }
        });
    });

    // Bottom navigation
    bottomLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            clearActive(bottomLinks);
            clearActive(sidebarLinks);
            link.classList.add("active");

            const bottomText = link.textContent.trim().toLowerCase();
            const sidebarText = Object.keys(linkTextMap).find(
                (key) => linkTextMap[key] === bottomText
            ) || bottomText;
            sidebarLinks.forEach((sLink) => {
                if (sLink.textContent.trim().toLowerCase() === sidebarText) {
                    sLink.classList.add("active");
                }
            });

            const href = link.getAttribute("href");
            if (href && href !== "#") {
                window.location.href = href;
            }
        });
    });

    // Optional: Dropdown auto-close on click
    document.querySelectorAll(".dropdown-menu .dropdown-item").forEach((item) => {
        item.addEventListener("click", function () {
            const dropdown = this.closest(".dropdown");
            if (dropdown) {
                dropdown.classList.remove("show");
                dropdown.querySelector(".dropdown-menu").classList.remove("show");
            }
        });
    });

    // Modal form reset
    const newTaskModal = document.getElementById("newTaskModal");
    const taskForm = document.getElementById("taskForm");

    if (newTaskModal && taskForm) {
        newTaskModal.addEventListener("hidden.bs.modal", () => {
            taskForm.reset();
        });
    }
});


export function showToast(message, type = 'success') {
  const toastEl = document.getElementById('taskToast');
  const toastBody = document.getElementById('taskToastBody');

  toastBody.textContent = message;

  // Update color class based on type
  toastEl.className = `toast align-items-center text-white bg-${type} border-0`;

  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}
