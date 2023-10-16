const overwriteButton = document.querySelector("#overwrite-button");
const formatSelect = document.querySelector("#format-select");


if (overwriteButton)
{
    const urlParams = new URLSearchParams(window.location.search);
    const postUUID = urlParams.get("id");

    overwriteButton.addEventListener("click", () =>
    {
        fetch("/edit", {
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