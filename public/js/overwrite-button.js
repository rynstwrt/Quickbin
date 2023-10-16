const overwriteButton = document.querySelector("#save-button");
const formatSelect = document.querySelector("#format-select");


if (overwriteButton)
{
    overwriteButton.addEventListener("click", () =>
    {
        fetch("/overwrite", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Accept": "application.json",
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                postUUID: postUUID,
                content: btoa(encodeURIComponent(editor.getValue())),
                format: formatSelect.value,
                hasEditPermission: hasEditPermission
            }),
            redirect: "follow",
            referrerPolicy: "no-referrer"
        }).then(response =>
        {
            window.open(response.url, "_self");
        });
    });
}