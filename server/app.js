var express = require("express");
var bodyParser = require("body-parser");
var uri = "mongodb://5nahalf:LornaWyatt651@ds031922.mongolab.com:31922/heroku_app36595117"
var app = express();
var index = require("./routes/index");
app.use(bodyParser.json());
app.use("/", index);

var server = //app.listen(3000, function(){
//    var port = server.address().port;
//    console.log("listenin' on port: ", port);
//});
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

app.use("/", index);
module.exports = app;