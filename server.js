var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require('fs');

var app = express();
var PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "app/public/home.html"));
});

app.get("/app/public/home.html", function (req, res) {
    res.send("This is the home page - navigated here!");
});

app.get("/app/public/survey.html", function (req, res) {
    console.log("survey");
    res.sendFile(path.join(__dirname, "app/public/survey.html"));
    //    res.send("Yes.  This is the survey page!");
});

app.post('/submit', function (req, res) {
    // Get the survey results
    // console.log('Req: ', req.headers.referer);
    // console.log('Name: ', req.body.name);
    // console.log('Photo: ', req.body.photo);
    // console.log('Scores: ', req.body.scores);
    let oThisUser = {};
    let aoOtherUsers = [{}];
    // let bReadFile = true;
    let bWriteFile = true;

    // if (bReadFile) {
//    console.log("readFile: ", path.join(__dirname, "app/data/friends.js"));
    fs.readFile(path.join(__dirname, "app/data/friends.js"), readIt);

    function readIt(err, data) {
        if (err) throw (err);
        aoOtherUsers = JSON.parse(data);
//        console.log("Inside func: ", aoOtherUsers);
        //     aoOtherUsers = [{
        //             name: 'John',
        //             photo: 'someURL',
        //             scores: [1, 1, 1, 1, 1, 5, 5, 5, 5, 5],
        //             //            iDelta: 100
        //         },
        //         {
        //             name: 'Tony',
        //             photo: 'someURL',
        //             scores: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        //             //            iDelta: 100
        //         },
        //     ];

        // find "partner"
        let iMinDelta = 100;
        let iCompat = 0;
        aoOtherUsers.forEach((user, i) => {
            let iDelta = 0;
//            console.log(user);
            user.scores.forEach((value2, j) => {
                iDelta += Math.abs(value2 - parseInt(req.body.scores[j]));
            });
            if (iDelta < iMinDelta) {
                iCompat = i;
                iMinDelta = iDelta;
            }
        });
        // now add this user to the array
        oThisUser.name = req.body.name;
        oThisUser.photo = req.body.photo;
        oThisUser.scores = req.body.scores.map(v => +v);
        //    oThisUser.iDelta = 100;
        aoOtherUsers.push(oThisUser);
//        console.log ("About to write: ", aoOtherUsers);
        // write a file!
        if (bWriteFile) {
            fs.writeFile(path.join(__dirname, "app/data/friends.js"), JSON.stringify(aoOtherUsers),
                function (err) {
                    console.log(err)
                });
        }
        res.end(JSON.stringify(aoOtherUsers[iCompat]));
    }
});