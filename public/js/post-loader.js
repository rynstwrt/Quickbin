formatSelect.value = format;
editor.setValue(atob(content));


formatSelect.addEventListener("change", () =>
{
    editor.session.setMode(`ace/mode/${formatSelect.value}`);
});