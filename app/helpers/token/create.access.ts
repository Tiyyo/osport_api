import jwt from 'jsonwebtoken';

const { sign } = jwt;

function createToken(expireTime: string, ...props: any) {
  const token = sign({ ...props }, process.env.JWT_TOKEN_KEY as string, {
    expiresIn: expireTime,
  });
  return token;
}

export default createToken;
