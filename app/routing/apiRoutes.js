let fs = require('fs');
let path = require('path');

module.exports = function (app) {

    app.post('/submit', function (req, res) {
        let oUserPassedIn = req.body;
        fs.readFile(path.join(__dirname, "../data/friends.json"), (err, data) => {
            let oThisUser = {};
            let aoOtherUsers = [{}];

            if (err) throw (err);
            aoOtherUsers = JSON.parse(data);
            // find "partner"
            let iMinDelta = 100;
            let iCompat = -1;
            aoOtherUsers.forEach((user, i) => {
                let iDelta = 0;
                //            console.log(user);
                user.scores.forEach((value2, j) => {
                    iDelta += Math.abs(value2 - parseInt(oUserPassedIn.scores[j]));
                });
                if (iDelta <= iMinDelta) {
                    iCompat = i;
                    iMinDelta = iDelta;
                }
            });
            // now add this user to the array
            oThisUser.name = oUserPassedIn.name;
            oThisUser.photo = oUserPassedIn.photo;
            oThisUser.scores = oUserPassedIn.scores.map(v => +v);
            // Check first and see if he/she is already there
            let iFoundIndex = -1;
            aoOtherUsers.find((oUser, i) => {
                if (oUser.name === oThisUser.name) {
                    iFoundIndex = i;
                    return (true);
                } else {
                    return (false);
                }
            });
            if (iFoundIndex >= 0) {
                aoOtherUsers.splice(iFoundIndex, 1);
            }
            aoOtherUsers.push(oThisUser);
            // write a file
            fs.writeFile(path.join(__dirname, "../data/friends.json"), JSON.stringify(aoOtherUsers),
                function (err) {
                    if (err) console.log(err);
                });
            sOutput = iCompat >= 0 ? JSON.stringify(aoOtherUsers[iCompat]) : "No match!";
            res.end(sOutput);
        });
    });
}