var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require('fs');

var app = express();
var PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

require('./app/routing/htmlRoutes')(app);
require('./app/routing/apiRoutes')(app);

// $('#submit').click(function () {
//     $.ajax({
//         type: 'POST',
//         url: '/submit'
//     });
// });