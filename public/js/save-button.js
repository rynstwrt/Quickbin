const editorElement = document.querySelector("#editor");
const saveButton = document.querySelector("#save-button");


saveButton.addEventListener("click", () =>
{
    fetch("/s", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
});