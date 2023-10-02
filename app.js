const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static("public"));
app.set("view engine", "pug");


app.get("/", (req, res) =>
{
    res.render("index");
    // res.sendFile(path.join(__dirname, "./views/index.html"))
});


app.get("/login", (req, res) =>
{
    res.render("login");
});


app.get("/register", (req, res) =>
{
    res.render("register");
});


app.listen(PORT, () => console.log("Quickbin listening on port " + PORT));