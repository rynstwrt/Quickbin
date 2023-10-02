const express = require("express");
const router = express.Router();
router.use(express.static("public"));
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const dbManager = require("../utils/db-manager");
const { showEntries, findUserByEmail, getPasswordFromEmail} = require("../utils/db-manager");


router.get("/", (req, res) =>
{
    res.render("login");
});


function onSuccessfulLogin(user)
{
    console.log("LOGGING IN " + user["Username"]);
}


router.post("/", urlEncodedParser, (req, res) =>
{
    const email = req.body.email;
    const password = req.body.password;

    dbManager.findUserByEmail(email).then(user =>
    {
        if (!user)
        {
            res.send("not found")
            return
        }

        const targetPassword = user["Password"];

        if (password === targetPassword)
        {
            onSuccessfulLogin(user);
            res.send("CORRECT PASSWORD! ");
            return;
        }

        res.send("FOUND! " + targetPassword);
    });
});


module.exports = router;