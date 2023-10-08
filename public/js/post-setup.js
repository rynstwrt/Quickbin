formatSelect.addEventListener("change", () =>
{
    console.log("A")
    editor.session.setMode(`ace/mode/${formatSelect.value}`);
});