const deleteButton = document.querySelector("#delete-button");


if (deleteButton)
{
    deleteButton.addEventListener("click", () =>
    {
        const urlParams = new URLSearchParams(window.location.search);
        const postUUID = urlParams.get("id");

        fetch("/delete", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Accept": "application.json",
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                postUUID: postUUID
            }),
            redirect: "follow",
            referrerPolicy: "no-referrer"
        }).then(response =>
        {
            window.open(response.url, "_self");
        });
    });
}