var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

$(document).ready(function () {
    let aiValuesChosen = new Array(10);
    // this assignment used for testing
//    aiValuesChosen = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
    let iChosenCount = 0;

    // OtherUsers should be in a file
    let aoOtherUsers = [{
            name: 'John',
            photo: 'someURL',
            scores: [1, 1, 1, 1, 1, 5, 5, 5, 5, 5]
        },
        {
            name: 'Tony',
            photo: 'someURL',
            scores: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
        },
    ]

    $('.select-buttons').on('change', function () {
        // id[1] gets the number from ids of the form q1
        aiValuesChosen[this.id[1]] = $(this).val();
    });
    $('#submit').on('click', function () {
        // save this user
        let sName = $('#name').val();
        let sPhoto = $('#photo').val();
        // console.log(sName);
        // console.log(sPhoto);
        // console.log(aiValuesChosen);
        // find "partner"
        let iMinDelta = 100;
        $.each(aoOtherUsers, (i, iValue) => {
            let iCompat = 0;
            let iDelta = 0;
            $.each(aoOtherUsers[i].scores, (j, iScore) => {
                iDelta += Math.abs(iScore - aiValuesChosen[j]);

            });
//            console.log (`User: ${i} score: ${iDelta}`)
            if (iDelta < iMinDelta) {
                iCompat = i;
                iMinDelta = iDelta;
            }
            $('#results-modal').attr('style', 'display: inline');
            $('#match-name').text (aoOtherUsers[iCompat].name);
        });
//        console.log("Compatible: ", aoOtherUsers[iCompat].name, iCompat);
    });
})