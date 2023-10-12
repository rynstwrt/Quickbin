const barsIcon = document.querySelector("#bars-icon");
const exitButton = document.querySelector("#exit-button");
const sideMenu = document.querySelector("#side-menu");


barsIcon.addEventListener("click", () =>
{
    sideMenu.style.left = "0";
});


exitButton.addEventListener("click", () =>
{
    sideMenu.style.left = "101%";
});