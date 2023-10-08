const saveButton = document.querySelector("#save-button");
const formatSelect = document.querySelector("#format-select");


saveButton.addEventListener("click", async () =>
{
    const urlParams = new URLSearchParams(window.location.search);
    const postUUID = urlParams.get("id");

    const json = postUUID ? {
        postUUID: postUUID,
        content: btoa(editor.getValue()),
        format: formatSelect.value
    } : {
        content: btoa(editor.getValue()),
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