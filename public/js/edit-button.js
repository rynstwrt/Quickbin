const editButton = document.querySelector("#edit-button");


if (editButton)
{
    editButton.addEventListener("click", () =>
    {
        const urlParams = new URLSearchParams(window.location.search);
        const postUUID = urlParams.get("id");
        window.location.href = `/edit/?id=${postUUID}`;
    });
}