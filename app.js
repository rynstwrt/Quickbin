const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static("public"));


app.get("/", (req, res) =>
{
    // res.send("asdf")
    res.sendFile(path.join(__dirname, "./views/index.html"))
});


app.listen(PORT, () => console.log("Quickbin listening on port " + PORT));