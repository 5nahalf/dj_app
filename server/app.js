var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var index = require("./routes/index");
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

app.use("/", index);
module.exports = app;