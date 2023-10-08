formatSelect.addEventListener("change", () =>
{
    editor.session.setMode(`ace/mode/${formatSelect.value}`);
});