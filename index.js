// Add JavaScript to handle the hamburger menu click event and show/hide the mobile menu
const hamburgerMenu = document.querySelector('.hamburger-menu');
const mobileMenuContent = document.querySelector('.mobile-menu-content');

hamburgerMenu.addEventListener('click', () => {
    mobileMenuContent.classList.toggle('show');
});
