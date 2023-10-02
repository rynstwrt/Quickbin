const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const dbManager = require("../utils/db-manager");
const {showEntries, isEmailAndUsernameAvailable} = require("../utils/db-manager");


router.use(express.static("public"));


router.get("/", (req, res) =>
{
    res.render("signup");
});


router.post("/", urlEncodedParser, (req, res) =>
{
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const passwordConfirm = req.body["confirm-password"];

    console.log("SIGNING UP: ", email, username, password, passwordConfirm);

    if (password !== passwordConfirm)
    {
        res.send("PASSWORDS DON'T MATCH");
        return;
    }

    isEmailAndUsernameAvailable(email, username).then(available =>
    {
        if (!available)
        {
            res.send("USERNAME UNAVAILABLE OR EMAIL ALREADY IN USE.");
            return;
        }

        dbManager.createUser(email, username, password);
    });

    // res.redirect("/");
    showEntries();
});


module.exports = router;