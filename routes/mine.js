const express = require("express");
const router = express.Router();
router.use(express.static("public"));


router.get("/", (req, res) =>
{
    if (!req.session || !req.session.user)
    {
        res.redirect("/login");
        res.end();
        return;
    }

    res.render("mine", { posts: req.session.user.posts, session: req.session });
});


module.exports = router;