const express = require("express");

var router = express.Router();

//Get index.ejs page

router.get("/", function (req, res, next) {
    res.render("index", { title: "Home" });
});

module.exports = router;
