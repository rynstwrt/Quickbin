const express = require("express");
const router = express.Router();
router.use(express.static("public"));


router.get("/", (req, res) =>
{
    // console.log(req.session)
    res.render("saved", { session: req.session });
});


module.exports = router;