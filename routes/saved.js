const express = require("express");
const router = express.Router();
router.use(express.static("public"));
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const DBManager = require("../utils/DBManager");


router.get("/", (req, res) =>
{
    DBManager.getUserPosts(req.session.userID).then(posts =>
    {
        res.render("saved", { session: req.session, posts: posts });
    });
});


router.post("/save", urlEncodedParser, (req, res) =>
{
    const userUUID = req.session.userUUID;
    const textContent = req.body.textContent;

    console.log(userUUID, textContent)
    DBManager.savePost(userUUID, textContent);
});


module.exports = router;