const jwt = require('jsonwebtoken');
const response = require('./template/response');

function verifyToken(req, res, next) {
    if (req.path === '/users/login') {
        return next();
    }

    var token = req.headers.authorization;

    if (!token) {
        return response(401, false, 'Unauthorized', res)
    } else {
        token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'secret-key', (err, decoded) => {
            if (err) {
                return response(401, false, 'Invalid Token', res)
            } else {
                req.user = decoded;
                next();
            }
        });
    }


}

module.exports = verifyToken;