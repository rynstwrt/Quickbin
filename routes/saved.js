const express = require("express");
const router = express.Router();
router.use(express.static("public"));
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const DBManager = require("../utils/DBManager");


router.get("/", urlEncodedParser, async (req, res) =>
{
    const postUUID = req.query.id;
    if (!postUUID)
    {
        res.redirect(`/error?error=No post ID specified!?details=You did not specify a post ID.`);
        res.end();
        return;
    }

    let post = await DBManager.getPostFromPostUUID(postUUID);
    if (!post) return;

    const postContent = post["Content"];
    const format = post["Format"];

    res.render("saved", { postUUID: postUUID, textContent: postContent, format: format, session: req.session });
});


module.exports = router;