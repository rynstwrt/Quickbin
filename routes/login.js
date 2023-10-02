const express = require("express");
const router = express.Router();
router.use(express.static("public"));
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });


router.get("/", (req, res) =>
{
    res.render("login");
});


router.post("/", urlEncodedParser, (req, res) =>
{
    const username = req.body.username;
    const password = req.body.password;
    const passwordConfirm = req.body["password-confirm"];

    // TODO: check if username exists

    if (password !== passwordConfirm)
    {
        res.render("error", {bigText: "Error!", smallText: "Password and password confirmation do not match!"});
        return;
    }

    console.log(username, password, passwordConfirm);
});


module.exports = router;