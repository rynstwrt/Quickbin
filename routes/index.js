const express = require("express");
const router = express.Router();
router.use(express.static("public"));


router.get("/", (req, res) =>
{
    res.render("index", { session: req.session });
});


module.exports = router;