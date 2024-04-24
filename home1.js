document.addEventListener('DOMContentLoaded', function() {
    let menu = document.querySelector('#menu-btn');
    let navbar = document.querySelector('.navbar');
    let loginBtn = document.querySelector('#login-btn');

    if (menu) {
        menu.onclick = () => {
            menu.classList.toggle('fa-times');
            navbar.classList.toggle('active');
        };
    } else {
        console.error("Menu button not found!");
    }

    if (loginBtn) {
        loginBtn.onclick = () => {
            document.querySelector('.login-form-container').classList.toggle('active');
        };
    } else {
        console.error("Login button not found!");
    }

    // Close login form
    let closeLoginFormBtn = document.querySelector('#close-login-form');
    if (closeLoginFormBtn) {
        closeLoginFormBtn.onclick = () => {
            document.querySelector('.login-form-container').classList.remove('active');
        };
    } else {
        console.error("Close login form button not found!");
    }

    if (signupbtn) {
        signupbtn.onclick = () => {
            document.querySelector('.login-form-container').classList.toggle('active');
        };
    } else {
        console.error("Login button not found!");
    }

    

    // Scroll event
    window.onscroll = () => {
        if (window.scrollY > 0) {
            document.querySelector('.header').classList.add('active');
        } else {
            document.querySelector('.header').classList.remove('active');
        }

        // Reset menu icon and navbar state on scroll
        menu.classList.remove('fa-time');
        navbar.classList.remove('active');
    };

    // Onload event
    window.onload = () => {
        if (window.scrollY > 0) {
            document.querySelector('.header').classList.add('active');
        } else {
            document.querySelector('.header').classList.remove('active');
        }
    };

 });
