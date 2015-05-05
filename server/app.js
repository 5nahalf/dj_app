var express = require("express");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use("/", index);
module.exports = app;
var app = express();
var index = require("./routes/index");

app.use("/", index);

var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log("listenin' on port: ", port);
});
