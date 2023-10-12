const express = require("express");
const router = express.Router();
router.use(express.static("public"));
const DBManager = require("../utils/DBManager");


router.get("/", (req, res) =>
{
    res.render("register");
});


router.post("/", async (req, res) =>
{
    const username = req.body.username;
    const password = req.body.password;
    const passwordConfirm = req.body["password-confirm"];

    if (!username || !password || !passwordConfirm)
    {
        res.redirect("/error?error=You must enter a username, password, and password confirmation..");
        res.end();
        return;
    }

    if (password !== passwordConfirm)
    {
        res.redirect("/error?error=Passwords do not match.&details=The password and password confirmation did not match.");
        res.end();
        return;
    }

    if (await DBManager.checkIfUsernameExists(username.toLowerCase()))
    {
        res.redirect("/error?error=Username already exists.");
        res.end();
        return;
    }

    await DBManager.register(username, password);

    console.log("Registered user " + username);

    res.redirect("/");
    res.end();
});


module.exports = router;