const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN;

function sign(payload) {
    return jwt.sign(payload, secret, { expiresIn: expiresIn });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

module.exports = {
    sign,
    verifyToken,
};
