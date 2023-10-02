const express = require("express");
const router = express.Router();
router.use(express.static("public"));
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const DBManager = require("../utils/DBManager.js");


router.get("/", (req, res) =>
{
    console.log(req.session)
    res.render("login", { session: req.session });
});


function onSuccessfulLogin(user)
{
    console.log("LOGGING IN " + user["Username"]);
}


router.post("/", urlEncodedParser, (req, res) =>
{
    const email = req.body.email;
    const password = req.body.password;

    DBManager.findUserByEmail(email).then(user =>
    {
        if (!user)
        {
            res.send("not found")
            res.end();
            return
        }

        if (password === user["Password"])
        {
            console.log("CORRECT PASSWORD FOR " + user["Username"] + "!");

            req.session.userID = user["ID"];
            req.session.userUsername = user["Username"];
            req.session.userEmail = user["Email"];

            res.redirect("/");
            res.end();
            return;
        }

        res.send("Incorrect password!");
    });
});


module.exports = router;