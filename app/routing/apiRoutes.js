var friendData = require("../data/friends");
var questions = require("../data/questions");

module.exports = function (app) {
    app.get("/api/friendData", function (req, res) {
        res.json(friendData);
    });

    app.post("/api/friendData", function (req, res) {
        var newFriendRes = req.body.responses;
        var currentTopMatch = 50;
        var topMatch;

        for (var i = 0; i < friendData.length; i++) {
            var currentFriend = friendData[i];
            var diff = [];

            for (var j = 0; j < newFriendRes.length; j++) {
                diff.push(Math.abs(newFriendRes[j] - currentFriend.responses[j]));
            }

            var totalDiff = diff.reduce(function (a, b) { return a + b });

            if (totalDiff < currentTopMatch) {
                topMatch = friendData[i];
            }
        }
        friendData.push(req.body);
        res.json(topMatch);

    });

    app.get("/api/questions", function (req, res) {
        res.json(questions);
    })
}