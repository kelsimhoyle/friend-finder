var friendData = require("../data/friends.js")

module.exports = function(app) {
    app.get("/api/friendData", function(req, res) {
        res.json(friendData);
    });

    app.post("/api/friendData", function(req, res) {
        friendData.push(req.body);
        res.json(friendData);
    });
}