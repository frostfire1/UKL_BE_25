const jwt = require('../Utils/JWT');

const authorize = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).send('Access Denied: No Token Provided!');

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).send('Access Denied: No Token Provided!');

    try {
        const verified = jwt.verifyToken(token);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

const validateRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) return res.status(403).send('Access Denied: Not Authorized');
    next();
};

module.exports = {authorize, validateRole};