const bcrypt = require('bcrypt');

const saltRounds = 10;

function hashPassword(password) {
    try {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password');
    }
}

function verifyPassword(password, hashedPassword) {
    try {
        const match = bcrypt.compareSync(password, hashedPassword);
        return match;
    } catch (error) {
        throw new Error('Error verifying password');
    }
}

module.exports = {
    hashPassword,
    verifyPassword
};