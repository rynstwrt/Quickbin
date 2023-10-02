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
    console.log(req.body)
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const passwordConfirm = req.body["confirm-password"];

    console.log("SIGNING UP: ", email, username, password, passwordConfirm);

    return;
    if (password !== passwordConfirm)
    {
        res.send("PASSWORDS DON'T MATCH");
        return;
    }

    DBManager.isEmailAndUsernameAvailable(email, username).then(available =>
    {
        if (!available.email)
        {
            res.send("EMAIL ALREADY REGISTERED");
            return;
        }

        if (!available.username)
        {
            res.send("USERNAME UNAVAILABLE");
            return;
        }

        DBManager.createUser(email, username, password);
    });

    // res.redirect("/");
    // DBManager.showEntries();
});


module.exports = router;