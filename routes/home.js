const express = require("express");
const router = express.Router();
router.use(express.static("public"));


router.get("/", (req, res) =>
{
    res.render("home", { session: req.session });
});


module.exports = router;