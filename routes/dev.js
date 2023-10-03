const express = require("express");
const router = express.Router();
router.use(express.static("public"));
const DBManager = require("../utils/DBManager");


router.get("/clearDB", (req, res) =>
{
    DBManager.showEntries();
    DBManager.deleteAllUsers();
    res.redirect("/signup");
});


module.exports = router;