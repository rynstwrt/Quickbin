const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });


router.use(express.static("public"));


router.get("/", (req, res) =>
{
    res.render("signup");
});


router.post("/", urlEncodedParser, (req, res) =>
{
    const username = req.body.username;
    const password = req.body.password;
    const passwordConfirm = req.body["password-confirm"];

    console.log("SIGNUP")
    console.log(username, password, passwordConfirm);
});


module.exports = router;