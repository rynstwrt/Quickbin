const express = require("express");
const router = express.Router();
router.use(express.static("public"));
const DBManager = require("../utils/DBManager");
const uuid = require("uuid");
const {auth} = require("mysql/lib/protocol/Auth");


router.get("/", (req, res) =>
{
    res.render("login", { session: req.session });
});


router.post("/", async (req, res) =>
{
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password)
    {
        res.redirect("/error?error=Invalid username or password.");
        res.end();
        return;
    }

    const authenticatedUser = await DBManager.authenticate(username, password);
    if (!authenticatedUser)
    {
        res.redirect("/error?error=Invalid username or password.&details=Please try again.");
        res.end();
        return;
    }

    authenticatedUser["posts"] = await DBManager.getUserPosts(authenticatedUser.User_UUID);
    req.session.user = authenticatedUser;
    req.session.save();

    console.log("Logged in user " + username);
    console.log(req.session.user)

    res.redirect("/");
    res.end();
});


module.exports = router;