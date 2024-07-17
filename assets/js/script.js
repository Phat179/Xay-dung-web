// close navbar function
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');


if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}




// login popup
const showPopupBtn = document.querySelector(".login-btn");
const formPopup = document.querySelector(".form-popup");
const hidePopupBtn = document.querySelector(".form-popup .close-btn"); 
const loginSignupLink = document.querySelectorAll(".form-box .bottom-link a");

showPopupBtn.addEventListener("click", () => {
    document.body.classList.toggle("show-popup");
});

hidePopupBtn.addEventListener("click", () => showPopupBtn.click());

loginSignupLink.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        formPopup.classList[link.id === "signup-link" ? 'add' : 'remove']("show-signup");
    });
});

// confirm checkout 
function showConfirm() {
    if (confirm("ARE YOU SURE TO CHECKOUT?")) {
        alert("ORDER PLACED SUCCESSFULLY");
    } else {
        alert("Order UNSUCCESSFUL");
    }
}


// login 
function validateForm(event) {
    event.preventDefault();

    var email = document.getElementById('emailInput').value;
    var password = document.getElementById('passwordInput').value;

    if (email.trim() !== '' && password.trim() !== '') {
        window.location.href = 'loggedindex.html';
    } else {
        alert('Please fill in both email and password fields.');
    }
}