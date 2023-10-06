const express = require("express");
const router = express.Router();
router.use(express.static("public"));
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const DBManager = require("../utils/DBManager");


router.post("/", urlEncodedParser, (req, res) =>
{
    DBManager.savePost(req.body.textContent, req.body.format).then(postUUID =>
    {
        console.log(`/${postUUID}`)
        res.redirect(`/${postUUID}`);
        res.end();
    });
});


module.exports = router;