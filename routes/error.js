const express = require("express");
const router = express.Router();
router.use(express.static("public"));


router.get("/", (req, res) =>
{
    const error = req.query.error || "";
    const details = req.query.details || "";

    res.render("error", { error: error, details: details, session: req.session });
});


module.exports = router;