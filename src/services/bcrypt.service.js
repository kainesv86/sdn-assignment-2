const bcrypt = require("bcryptjs");
const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    return bcrypt.hashSync(password, salt);
}

function comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}

module.exports = {
    hashPassword,
    comparePassword,
};
