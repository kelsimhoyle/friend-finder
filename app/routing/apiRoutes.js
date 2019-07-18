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
            var totalDiff = 0;

            for (var j = 0; j < newFriendRes.length; j++) {
                totalDiff += Math.abs(newFriendRes[j] - currentFriend.responses[j]);
            }

            if (totalDiff < currentTopMatch) {
                topMatch = friendData[i];
                currentTopMatch = totalDiff;
            }
        }
        friendData.push(req.body);
        res.json(topMatch);

    });

    app.get("/api/questions", function (req, res) {
        res.json(questions);
    })
}