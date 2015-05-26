var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var uri = 'mongodb://client:client@ds031922.mongolab.com:31922/heroku_app36595117';
mongoose.connect(uriUtil.formatMongoose(uri));

var path =require("path");
var Cat = mongoose.model("cat", {name:String});
var Song = mongoose.model("music", {name:String, song:String, lyrics:String});

router.post("/madd", function(request, response, next){
    var music = new Song({name: request.body.name, song: request.body.song, lyrics: request.body.lyrics});
    music.save(function(err){
        if(err) console.log("meow %s", err);
        response.send(music.toJSON());
        //next();
    });
});
router.post('/mremove', function(request, response, next) {
    var music = Song.find({name: request.body.name, song: request.body.song, lyrics: request.body.lyrics});
    music.remove(function(err) {
        if (err) console.log('Error when removing cat: %s', err);
        //next();
    });
});
router.get("/musicdata", function(request, response, next){
    return Song.find({}).exec(function(err, musics){
        if(err) throw new Error(err);
        response.send(JSON.stringify(musics));
        //next();
    });
});


//request side

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
