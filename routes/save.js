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
        res.end();
        return;
    }

    DBManager.getPostFromPostUUID(postUUID).then(post =>
    {
        if (!post)
        {
            res.redirect(`/error?error=Invalid ID.&details=No post with ID ${postUUID} found.`);
            res.end();
            return;
        }

        const hasEditPermission = req.session && req.session.user && post.Author_UUID === req.session.user.User_UUID;
        res.render("save", { content: post.Content, format: post.Format, hasEditPermission: hasEditPermission, session: req.session });
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

    DBManager.savePost(content, format, req.session.user.User_UUID).then(postUUID =>
    {
        console.log("/save?id=" + postUUID);
        res.redirect("/save?id=" + postUUID);
        res.end();
    });
});


module.exports = router;