const Users = require("../schema/users");
const jwtService = require("../services/jwt.service");

async function parseToken(req, res, next) {
    const token = req.session.token;

    res.locals.isLogin = false;

    if (!token) return next();

    const decoded = jwtService.verifyToken(token);

    const user = await Users.findOne({ username: decoded.username });

    if (!user) return next();

    res.locals.isLogin = true;

    res.locals.user = user;

    next();
}

module.exports = { parseToken };
