const express = require("express");
const router = express.Router();
router.use(express.static("public"));
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const DBManager = require("../utils/DBManager");


router.post("/", urlEncodedParser, async (req, res) =>
{
    console.log(req.body)

    if (!req.body.postUUID)
    {
        const postUUID = await DBManager.savePost(req.body.textContent, req.body.format);

        console.log(`/saved?id=${postUUID}`);
        res.redirect(200, `/saved?id=${postUUID}`);
        res.end();
    }
    else
    {
        // console.log(postUUID);
        console.log("SFDSDFSD")
        const postUUID = req.body.postUUID;
        console.log(`/saved?id=${postUUID}`);

        DBManager.saveExistingPost(postUUID, req.body.textContent, req.body.format).then((req, res) =>
        {
            // res.redirect(200, `/saved?id=${postUUID}`);
            // res.end();
        });
    }
});


module.exports = router;