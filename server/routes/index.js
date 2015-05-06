var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
// We use mongodb-uri (install it as a dependency with NPM) to format the URI
var uriUtil = require('mongodb-uri');
// I got this from Mongolab's GUI, yours will be different. I created a DB user "client" with pw of "client" for the purposes here, this definitely isn't secure.
var uri = 'mongodb://client:client@ds031922.mongolab.com:31922/heroku_app36595117';
// Finally, make the connection with the URI formatted for mongoose
mongoose.connect(uriUtil.formatMongoose(uri));
var Cat = mongoose.model("cat", {name:String});
var path =require("path");
router.post("/add", function(request, response, next){
    var kitty = new Cat({name: request.body.name});
    kitty.save(function(err){
        if(err) console.log("meow %s", err);
        response.send(kitty.toJSON());
        //next();
    });
});
router.post('/remove', function(request, response, next) {
    var kitty = Cat.find({name: request.body.name});
    kitty.remove(function(err) {
        if (err) console.log('Error when removing cat: %s', err);
        //next();
    });
});
router.get("/cats", function(request, response, next){
    return Cat.find({}).exec(function(err, cats){
        if(err) throw new Error(err);
        response.send(JSON.stringify(cats));
        //next();
    });
});

router.get("/*", function(req, res, next) {
    console.log("ayo for yayo");
    var file = req.params[0] || "views/index.html";
    res.sendFile(path.join(__dirname, "../public", file));
    //next();
});

module.exports = router;
