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
    // console.log(req.body)
    const userUUID = req.session.userID;
    const textContent = req.body["text-content"];

    console.log(userUUID, textContent)
    // DBManager.savePost(req.session.userID, req.body.text);
});


module.exports = router;