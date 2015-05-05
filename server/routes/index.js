var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/basic_walking_skeleton");
var Cat = mongoose.model("cat", {name:String});
var path =require("path");

router.get("/", function(req, res, next) {
    console.log("ayo for yayo");
    var file = req.params[0] || "views/index.html";
    res.sendFile(path.join(__dirname, "../public", file));
    next();
});

module.exports = router;
