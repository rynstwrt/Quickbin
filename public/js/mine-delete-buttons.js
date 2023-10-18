const deleteButtons = document.querySelectorAll(".delete-button");


if (deleteButtons)
{
    for (let i = 0; i < deleteButtons.length; ++i)
    {
        const button = deleteButtons[i];

        button.addEventListener("click", () =>
        {
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
                    postUUID: button.name
                }),
                redirect: "follow",
                referrerPolicy: "no-referrer"
            }).then(response =>
            {
                window.open(response.url, "_self");
            });
        });
    }
}