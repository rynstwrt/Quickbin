const signupSubmitButton = document.querySelector("button#signin-submit");
const form = document.querySelector("#signup-form");

signupSubmitButton.addEventListener("click", () =>
{
    fetch("/xsignup", {
        method: "POST",
        body: new FormData(form)
    }).then(response =>
    {
        console.log("A")
        const text = response.text();
        console.log(text);
    });

    // const xhr = new XMLHttpRequest();
    //
    // xhr.onreadystatechange = () =>
    // {
    //     if (xhr.readyState === XMLHttpRequest.DONE)
    //     {
    //         alert(xhr.responseText);
    //     }
    // }
    //
    // xhr.open("POST", "/signup", true);
    //
    // xhr.onload = (a) =>
    // {
    //     console.log(a)
    // }
    //
    // const formData = new FormData();
    // formData.append("email", "woofyry2222n@gmail.com");
    // formData.append("username", "aaaaaaaa");
    // formData.append("password", "1234");
    // formData.append("confirm-password", "1234");
    //
    // // console.log(formData)
    // xhr.send(formData);
});