import jwt from 'jsonwebtoken';

const { sign } = jwt;

function createToken(expireTime: string, ...props: any) {
  const token = sign({ ...props }, 'secretkeyfortesting', {
    expiresIn: expireTime,
  });
  return token;
}

export default createToken;
