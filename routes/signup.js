const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const DBManager = require("../utils/DBManager");


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

    DBManager.isEmailAndUsernameAvailable(email, username).then(available =>
    {
        if (available.email && available.username)
        {
            DBManager.createUser(email, username, password);
        }

        if (!available.email)
        {
            console.log("SKIPPING B/C EMAIL EXISTS");
            // res.send("EMAIL ALREADY REGISTERED");
            // return;
        }

        if (!available.username)
        {
            console.log("SKIPPING B/C USERNAME EXISTS");
            // res.send("USERNAME UNAVAILABLE");
            // return;
        }

        res.redirect("/");
    });

    // res.redirect("/");
    // DBManager.showEntries();
});


module.exports = router;