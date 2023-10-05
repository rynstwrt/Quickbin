const saveButton = document.querySelector("#save-button");


saveButton.addEventListener("click", async () =>
{
    await fetch("/saved/save", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            textContent: editor.getValue()
        })
    });
});