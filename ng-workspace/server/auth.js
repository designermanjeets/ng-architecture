const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        // const token = req.headers.authorization.split(" ")[1];
        const token = req.headers.authorization.split(" ")[1] || req.body.token || req.query.token || req.headers['x-access-token']

        console.log(token)
        jwt.verify(token, "some-secret-shit-goes-here");
        next();
    } catch (error) {
        res.status(401).json({ message: "Authentication failed! 1" });
    }
};