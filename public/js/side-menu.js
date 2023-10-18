const barsIcon = document.querySelector("#bars-icon");
const exitButton = document.querySelector("#exit-button");
const sideMenu = document.querySelector("#side-menu");


barsIcon.addEventListener("click", () =>
{
    sideMenu.style.left = "0";
    barsIcon.style.opacity = "0";
    // exitButton.style.opacity = "1";
});


exitButton.addEventListener("click", () =>
{
    sideMenu.style.left = "101%";
    barsIcon.style.opacity = "1";
    // exitButton.style.opacity = "0";
});