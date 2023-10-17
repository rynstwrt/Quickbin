const express = require("express");
const router = express.Router();
router.use(express.static("public"));
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const DBManager = require("../utils/DBManager.js");


router.post("/", urlEncodedParser, (req, res) =>
{
    const postUUID = req.body.postUUID;

    if (!req.session || !req.session.user)
        return;

    DBManager.getPostFromPostUUID(postUUID).then(async post =>
    {
        const authorUUID = post.Author_UUID;

        if (authorUUID !== req.session.user.User_UUID)
        {
            res.redirect("/error?error=You do not have permission to delete that post.");
            res.end();
            return;
        }

        await DBManager.deletePost(postUUID);
        req.session.user.posts = req.session.user.posts.filter(post =>
        {
            return post.Post_UUID !== postUUID;
        });
        console.log("Deleted post " + postUUID)

        res.redirect("/");
        res.end();
    });
});


module.exports = router;