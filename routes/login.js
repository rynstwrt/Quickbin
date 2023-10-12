const express = require("express");
const router = express.Router();
router.use(express.static("public"));
const DBManager = require("../utils/DBManager");


router.get("/", (req, res) =>
{
    res.render("login", { session: req.session });
});


router.post("/", async (req, res) =>
{
    const username = req.body.username;
    const password = req.body.password;

    console.log(username, password)

    if (!username || !password || !await DBManager.checkCredentials(username, password))
    {
        res.redirect("/error?error=Invalid username or password.");
        res.end();
        return;
    }

    req.session.user = {
        username: username,
        password: password
    };

    console.log("Logged in " + username);

    res.redirect("/");
    res.end();
});


module.exports = router;