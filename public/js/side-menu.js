const headerHamburgerMenu = document.querySelector("header .hamburger-icon");
const menuHamburgerMenu = document.querySelector("#side-menu .hamburger-icon");
const sideMenu = document.querySelector("#side-menu");

let isOpen = false;


function toggleMenu(open)
{
    sideMenu.style.left = open ? "0" : "100%";
}


headerHamburgerMenu.addEventListener("click", () =>
{
    isOpen = true;
    toggleMenu(isOpen);
});


menuHamburgerMenu.addEventListener("click", () =>
{
    isOpen = false;
    toggleMenu(isOpen);
});


document.addEventListener("keydown", key =>
{
    if (key.key === "Tab")
    {
        isOpen = !isOpen;
        toggleMenu(isOpen);
    }
})