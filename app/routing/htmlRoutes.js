module.exports = function (app) {

    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "app/public/home.html"));
    });

    app.get("/home.html", function (req, res) {
        res.send("This is the home page - navigated here!");
    });

    app.get("/survey.html", function (req, res) {
        res.sendFile(path.join(__dirname, "app/public/survey.html"));
    });

}