const DEFAULT_THEME = "twilight";
const DEFAULT_LANGUAGE = "javascript";

let theme = DEFAULT_THEME;
let language = DEFAULT_LANGUAGE;

const editor = ace.edit("editor");


editor.setTheme(`ace/theme/${theme}`);
editor.session.setMode(`ace/mode/${language}`);