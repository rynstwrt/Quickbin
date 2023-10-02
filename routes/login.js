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
            // res.send("CORRECT PASSWORD! ");
            // return;

            // req.session.user_id = user["ID"];

            // console.log(user);
            // userInfo.userInfoID = user["ID"];
            // userInfo.userUsername = user["Username"];
            // userInfo.userEmail = user["Email"];

            // console.log(req.session)

            res.redirect("/");
        }


        // res.send("FOUND! " + targetPassword);
    });
});


module.exports = router;