const express = require("express");
const router = express.Router();
router.use(express.static("public"));
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const DBManager = require("../utils/DBManager");


router.get("/", urlEncodedParser, (req, res) =>
{
    // get uuid in database
    res.send("asdf")
});


module.exports = router;