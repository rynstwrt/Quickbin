const express = require("express");
const router = express.Router();
router.use(express.static("public"));


router.get("/", (req, res) =>
{
    res.render("error", {bigText: "Error!", smallText: "asdf"});
});


module.exports = router;