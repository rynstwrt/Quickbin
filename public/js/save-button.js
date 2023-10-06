const saveButton = document.querySelector("#save-button");
const formatSelect = document.querySelector("#format-select");


saveButton.addEventListener("click", async () =>
{
    await fetch("/save", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            textContent: editor.getValue(),
            format: formatSelect.value
        })
    });
});