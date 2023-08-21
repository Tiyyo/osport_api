import jwt from 'jsonwebtoken';

const { sign } = jwt;

function createToken(expireTime: string | number, ...props: any) {
  const token = sign({ ...props }, process.env.JWT_REFRESH_TOKEN_KEY as string, {
    expiresIn: expireTime,
  });
  return token;
}

export default createToken;
