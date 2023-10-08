formatSelect.value = format;
editor.setValue(atob(content));
editor.session.setMode(`ace/mode/${format}`);