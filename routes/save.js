const express = require("express");
const router = express.Router();
router.use(express.static("public"));
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const DBManager = require("../utils/DBManager.js");


router.get("/", urlEncodedParser, (req, res) =>
{
    const postUUID = req.query.id;
    if (!postUUID)
    {
        res.redirect("/error?error=No ID specified.&details=Endpoint was reached with no ID passed.");
        return;
    }

    DBManager.getPostFromPostUUID(postUUID).then(post =>
    {
        if (!post)
        {
            res.redirect(`/error?error=Invalid ID.&details=No post with ID ${postUUID} found.`);
            return;
        }

        res.render("save", { postUUID: post.Post_UUID, content: post.Content, format: post.Format, session: req.session });
    });
});


router.post("/", urlEncodedParser, (req, res) =>
{
    const content = req.body.content;
    const format = req.body.format;
    const authorUsername = req.session.username;

    DBManager.getAuthorUUIDFromUsername(authorUsername).then(authorUUID =>
    {
        if (authorUUID)
        {
            DBManager.savePost(content, format, authorUUID).then(newPostUUID =>
            {
                console.log("/save?id=" + newPostUUID);
                res.redirect("/save?id=" + newPostUUID);
                res.end();
            });
        }
        else
        {
            DBManager.savePost(content, format).then(newPostUUID =>
            {
                console.log("/save?id=" + newPostUUID);
                res.redirect("/save?id=" + newPostUUID);
                res.end();
            });
        }
    });
});


module.exports = router;