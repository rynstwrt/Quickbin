const saveButton = document.querySelector("#save-button");
const formatSelect = document.querySelector("#format-select");


saveButton.addEventListener("click",  () =>
{
    fetch("/save", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Accept": "application.json",
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            content: btoa(editor.getValue()),
            format: formatSelect.value
        }),
        redirect: "follow",
        referrerPolicy: "no-referrer"
    }).then(response =>
    {
        window.open(response.url, "_self");
    });
});