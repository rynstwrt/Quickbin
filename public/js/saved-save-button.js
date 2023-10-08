const saveButton = document.querySelector("#save-button");


saveButton.addEventListener("click", async () =>
{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const postUUID = urlParams.get("id");

    await fetch("/save", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            postUUID: postUUID,
            textContent: editor.getValue(),
            format: formatSelect.value
        })
    });
});