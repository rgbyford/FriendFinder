module.exports = function(app) {

    app.post('/submit', function (req, res) {
        // Get the survey results
        let oThisUser = {};
        let aoOtherUsers = [{}];
    
        fs.readFile(path.join(__dirname, "../data/friends.json"), readIt);
    
        function readIt(err, data) {
            if (err) throw (err);
            aoOtherUsers = JSON.parse(data);
            // find "partner"
            let iMinDelta = 100;
            let iCompat = -1;
            aoOtherUsers.forEach((user, i) => {
                let iDelta = 0;
                //            console.log(user);
                user.scores.forEach((value2, j) => {
                    iDelta += Math.abs(value2 - parseInt(req.body.scores[j]));
                });
                if (iDelta <= iMinDelta) {
                    iCompat = i;
                    iMinDelta = iDelta;
                }
            });
            // now add this user to the array
            oThisUser.name = req.body.name;
            oThisUser.photo = req.body.photo;
            oThisUser.scores = req.body.scores.map(v => +v);
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
                //             console.log("found ", oThisUser.name);
                aoOtherUsers.splice(iFoundIndex, 1);
            }
            aoOtherUsers.push(oThisUser);
            // write a file
            fs.writeFile(path.join(__dirname, "../data/friends.json"), JSON.stringify(aoOtherUsers),
                function (err) {
                    if (err) console.log(err);
                });
            console.log(`Most compatible: ${iCompat}, ${aoOtherUsers[iCompat]}`);
            sOutput = iCompat >= 0 ? JSON.stringify(aoOtherUsers[iCompat]) : "No match!";
            res.end(sOutput);
        }
    });
}