const express = require("express");
const router = express.Router();
router.use(express.static("public"));


router.get("/", (req, res) =>
{
    req.session.destroy();
    res.redirect("/");
});


module.exports = router;