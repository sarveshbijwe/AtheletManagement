const navbarMenu = document.querySelector(".navbar .links");
const hamburgerBtn = document.querySelector(".hamburger-btn");
const hideMenuBtn = navbarMenu.querySelector(".close-btn");
const showPopupBtn = document.querySelector(".login-btn");
const formPopup = document.querySelector(".form-popup");
const hidePopupBtn = formPopup.querySelector(".close-btn");
const signupLoginLink = formPopup.querySelectorAll(".bottom-link a");
const registerBtn = document.querySelector('.register-btn');
const loginForm = document.getElementById('loginForm');
const signupForm = document.querySelector('.signup form');
// Show mobile menu
hamburgerBtn.addEventListener("click", () => {
    navbarMenu.classList.toggle("show-menu");
});
// Hide mobile menu
hideMenuBtn.addEventListener("click", () =>  hamburgerBtn.click());
// Update the register button event listener
if (registerBtn) {
    registerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // Instead of showing the popup form, redirect to profile.html
        window.location.href = 'profile.html';
    });
}


// Show login popup
showPopupBtn.addEventListener("click", () => {
    document.body.classList.toggle("show-popup");
});
// Hide login popup
hidePopupBtn.addEventListener("click", () => showPopupBtn.click());
// hidePopupBtn.forEach(btn => {
//     btn.addEventListener("click", () => {
//         document.body.classList.remove("show-popup");
//         formPopup.classList.remove("show-signup"); // Reset to login form
//     });
// });
// Login form submission
//document.addEventListener('DOMContentLoaded', function() {
if (loginForm) {
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Get form values
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // In a real app, you would validate credentials here
    // For demo purposes, we'll just redirect to dashboard
    if (email && password) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    window.location.href = 'dashboard.html';
    }else {
        alert('Please enter both email and password');
    }
});
}
//});
// Show or hide signup form
signupLoginLink.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        formPopup.classList[link.id === 'signup-link' ? 'add' : 'remove']("show-signup");
    });
});
signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // In a real app, you would create a new user account here
    // For demo purposes, we'll just redirect to dashboard
    window.location.href = 'dashboard.html';
});
