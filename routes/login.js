const express = require("express");
const router = express.Router();
router.use(express.static("public"));
const DBManager = require("../utils/DBManager");
const uuid = require("uuid");


router.get("/", (req, res) =>
{
    res.render("login", { session: req.session });
});


router.post("/", async (req, res) =>
{
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password || !await DBManager.checkCredentials(username, password))
    {
        res.redirect("/error?error=Invalid username or password.");
        res.end();
        return;
    }

    // const userUUID = await DBManager.getAuthorUUIDFromUsername(username);
    //
    // const sessionToken = uuid.v4();
    // const sessionExpiration = new Date().setFullYear(new Date().getFullYear() + 1);
    //
    // sessions[sessionToken] = {
    //     sessionExpiration,
    //     authorUsername: username,
    //     authorPassword: password,
    //     authorUUID: userUUID
    // };
    //
    // res.cookie("user_session", sessionToken, { maxAge: sessionExpiration });


    req.session.user = {
        username: username.toLowerCase(),
        password: password
    };

    // res.cookie("user", req.session.user);
    // TODO: res.clearCookie("user"); in /logout


    console.log("Logged in " + username);

    res.redirect("/");
    res.end();
});


module.exports = router;