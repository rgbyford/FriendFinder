module.exports = function (app) {
    var path = require("path");

    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));

    });

    app.get("/home.html", function (req, res) {
        res.send("This is the home page - navigated here!");
    });

    app.get("/survey.html", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    app.get("/friends", function (req, res) {
        res.sendFile(path.join(__dirname, "../data/friends.json"));
    });

}