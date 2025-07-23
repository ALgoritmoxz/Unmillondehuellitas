
document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");
    const adminPanel = document.getElementById("admin-panel");
    const adminLoginBtn = document.getElementById("admin-login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const configPixelsBtn = document.getElementById("config-pixels");
    const pixelForm = document.getElementById("pixelForm");
    const cancelBtn = document.getElementById("cancel-btn");
    const form = document.getElementById("form-pixel");
    const mainSite = document.getElementById("main-site");
    const adminLogin = document.getElementById("admin-login");
    const approveChangesBtn = document.getElementById("approve-changes");
    let selectedPixels = [];

    // Show the login form when trying to access the admin panel
    adminLoginBtn.addEventListener("click", function() {
        mainSite.style.display = "none";
        adminLogin.style.display = "block";
    });

    // Check for admin credentials
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const user = document.getElementById("admin-user").value;
        const pass = document.getElementById("admin-pass").value;

        // Hardcoded credentials (use secure method in real apps)
        if (user === "admin" && pass === "admin123") {
            adminLogin.style.display = "none";
            adminPanel.style.display = "block";
        } else {
            alert("Credenciales incorrectas");
        }
    });

    // Create 10000 pixels (100x100 grid)
    for (let i = 0; i < 10000; i++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");

        // Allow pixel selection with the mouse
        pixel.addEventListener("click", function() {
            if (selectedPixels.includes(pixel)) {
                selectedPixels = selectedPixels.filter(p => p !== pixel);
                pixel.classList.remove("selected");
            } else {
                selectedPixels.push(pixel);
                pixel.classList.add("selected");
            }
        });

        adminPanel.appendChild(pixel);
    }

    // Configure the number of pixels
    configPixelsBtn.addEventListener("click", function() {
        const newPixels = prompt("Introduce el número de píxeles que deseas mostrar:", "10000");
        if (newPixels && !isNaN(newPixels)) {
            alert(`Estableciendo ${newPixels} píxeles`);
            // logic to resize grid
        }
    });

    // Hide pixel form
    cancelBtn.addEventListener("click", function() {
        pixelForm.style.display = "none";
    });

    // Handle form submission for pixel customization
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        selectedPixels.forEach(pixel => {
            const imageUrl = document.getElementById("image").value;
            const imageFile = document.getElementById("image-upload").files[0];
            const name = document.getElementById("name").value;
            const color = document.getElementById("color").value;

            if (imageFile) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    pixel.style.backgroundImage = `url(${event.target.result})`;
                };
                reader.readAsDataURL(imageFile);
            } else if (imageUrl) {
                pixel.style.backgroundImage = `url(${imageUrl})`;
            }

            pixel.style.backgroundColor = color;
            pixel.setAttribute("data-name", name);
        });

        pixelForm.style.display = "none";
    });

    // Approve changes
    approveChangesBtn.addEventListener("click", function() {
        selectedPixels.forEach(pixel => {
            // Apply the changes to the selected pixels
            pixel.style.border = "2px solid green"; // Mark the pixels as approved
        });

        alert("Cambios aprobados y aplicados a los píxeles seleccionados.");
    });

    // Log out
    logoutBtn.addEventListener("click", function() {
        adminPanel.style.display = "none";
        adminLogin.style.display = "block";
        mainSite.style.display = "block";
    });
});
