const express = require("express");
const router = express.Router();
router.use(express.static("public"));


router.get("/", (req, res) =>
{
    if (!req.session.user)
    {
        res.redirect("/");
        res.end();
        return;
    }

    const username = req.session.user.Username;
    req.session.destroy(() =>
    {
        console.log("Logged out user " + username);
    });

    res.redirect("/");
    res.end();
});


module.exports = router;