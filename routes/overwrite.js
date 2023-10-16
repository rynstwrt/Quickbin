// const express = require("express");
// const router = express.Router();
// router.use(express.static("public"));
// const bodyParser = require("body-parser");
// const urlEncodedParser = bodyParser.urlencoded({ extended: false });
// const DBManager = require("../utils/DBManager.js");
//
//
// router.post("/", urlEncodedParser, (req, res) =>
// {
//     const postUUID = req.body.postUUID;
//     const content = req.body.content;
//     const format = req.body.format;
//     const hasEditPermission = req.body.hasEditPermission;
//
//     if (!req.session || !req.session.user || req.session.user.User_UUID != )
//
//     if (!req.session || !req.session.user)
//     {
//         DBManager.savePost(content, format).then(newPostUUID =>
//         {
//             console.log("/save?id=" + newPostUUID);
//             res.redirect("/save?id=" + newPostUUID);
//             res.end();
//         });
//
//         return;
//     }
//
//     DBManager.savePost(content, format, req.session.user.User_UUID).then(postUUID =>
//     {
//         console.log("/save?id=" + postUUID);
//         res.redirect("/save?id=" + postUUID);
//         res.end();
//     });
// });
//
//
// module.exports = router;