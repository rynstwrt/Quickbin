const saveButton = document.querySelector("#save-button");


saveButton.addEventListener("click", async () =>
{
    const urlParams = new URLSearchParams(window.location.search);
    const postUUID = urlParams.get("id");

    const json = !postUUID ? {
        content: editor.getValue(),
        format: formatSelect.value
    } : {
        postUUID: postUUID,
        content: editor.getValue(),
        format: formatSelect.value
    }

    await fetch("/save", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(json)
    });
});