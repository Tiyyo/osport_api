import jwt from "jsonwebtoken";
import AuthorizationError from "../helpers/errors/unauthorized.error";
const { verify } = jwt;
export const validateToken = (req, _res, next) => {
    let token = "";
    let authHeaders = req.headers.Authorization || req.headers.authorization;
    if (authHeaders && typeof authHeaders === "string" && authHeaders.startsWith("Bearer")) {
        token = authHeaders.split(" ")[1];
        verify(token, process.env.JWT_TOKEN_KEY, (err, decoded) => {
            if (err)
                throw new AuthorizationError('Unauthorized user');
            next();
        });
    }
    if (!token)
        throw new AuthorizationError('Unauthorized user');
};
