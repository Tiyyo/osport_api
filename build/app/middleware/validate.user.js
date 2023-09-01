import jwt from 'jsonwebtoken';
import AuthorizationError from '../helpers/errors/unauthorized.error.js';
const { verify } = jwt;
const validateUser = async (req, _res, next) => {
    next();
    let token = '';
    let userInfos = {};
    if (req.cookies && req.cookies.accessToken)
        token = req.cookies.accessToken;
    verify(token, process.env.JWT_TOKEN_KEY, async (err, decoded) => {
        if (err || !decoded || typeof decoded === 'string')
            next(new AuthorizationError('Unauthorized'));
        if (decoded)
            userInfos = decoded;
        const headersUserId = userInfos[0].userId;
        const bodyUserId = req.body.id;
        if (headersUserId !== bodyUserId)
            next(new AuthorizationError('Unauthorized user'));
    });
};
export default validateUser;
