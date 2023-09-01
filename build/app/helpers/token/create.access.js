import jwt from 'jsonwebtoken';
const { sign } = jwt;
// Small function to create signed token
function createToken(expireTime, ...props) {
    const token = sign({ ...props }, process.env.JWT_TOKEN_KEY, {
        expiresIn: expireTime,
    });
    return token;
}
export default createToken;
