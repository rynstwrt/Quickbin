const express = require("express");
const path = require("path");

const app = express();
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;


app.get("/", (req, res) =>
{
    res.sendFile(path.join(__dirname, "./views/index.html"))
});


app.listen(PORT, () =>
{
    console.log("Quickbin listening on port " + PORT);
});