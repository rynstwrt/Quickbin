const express = require("express");
const router = express.Router();
router.use(express.static("public"));
const DBManager = require("../utils/DBManager");

x
router.get("/", (req, res) =>
{
    DBManager.getUserPosts(req.session.userID).then(posts =>
    {
        res.render("saved", { session: req.session, posts: posts });
    });
});


router.post("/save", (req, res) =>
{
    DBManager.savePost(req.body.userID, req.body.text);
});


module.exports = router;