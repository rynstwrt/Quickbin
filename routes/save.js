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

        if (post.Author_UUID === req.session.)

        res.render("save", { postUUID: post.Post_UUID, content: post.Content, format: post.Format, authorUUID: post.Author_UUID, session: req.session });
    });
});


router.post("/", urlEncodedParser, (req, res) =>
{
    const content = req.body.content;
    const format = req.body.format;

    if (!req.session || !req.session.user)
    {
        DBManager.savePost(content, format).then(newPostUUID =>
        {
            console.log("/save?id=" + newPostUUID);
            res.redirect("/save?id=" + newPostUUID);
            res.end();
        });

        return;
    }

    DBManager.getAuthorUUIDFromUsername(req.session.user.username).then(authorUUID =>
    {
        DBManager.savePost(content, format, authorUUID).then(newPostUUID =>
        {
            console.log("/save?id=" + newPostUUID);
            res.redirect("/save?id=" + newPostUUID);
            res.end();
        });
    });
});


module.exports = router;