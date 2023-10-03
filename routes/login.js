const express = require("express");
const router = express.Router();
router.use(express.static("public"));
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const DBManager = require("../utils/DBManager.js");


router.get("/", (req, res) =>
{
    res.render("login", { session: req.session });
});


router.post("/", urlEncodedParser, (req, res) =>
{
    const email = req.body.email;
    const password = req.body.password;

    DBManager.findUserByEmail(email).then(user =>
    {
        if (!user || password !== user["Password"])
        {
            res.redirect("/error?error=Incorrect email or password.&details=The email you entered does not exist or was submited with an invalid password.");
            res.end();
            return
        }

        console.log("CORRECT PASSWORD FOR " + user["Username"] + "!");

        req.session.userID = user["ID"];
        req.session.userUsername = user["Username"];
        req.session.userEmail = user["Email"];

        res.redirect("/");
        res.end();
    });
});


module.exports = router;