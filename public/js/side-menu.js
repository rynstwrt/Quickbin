const headerHamburgerMenu = document.querySelector("header .hamburger-icon");
const menuHamburgerMenu = document.querySelector("#side-menu .hamburger-icon");
const sideMenu = document.querySelector("#side-menu");


headerHamburgerMenu.addEventListener("click", () =>
{
    sideMenu.style.left = "0";
});


menuHamburgerMenu.addEventListener("click", () =>
{
    sideMenu.style.left = "100%";
});