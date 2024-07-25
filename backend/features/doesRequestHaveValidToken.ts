import { Request } from 'express';
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';

export function doesRequestHaveValidToken(request: Request): boolean {
  const authorization = request.get('authorization');
  if (!authorization) {
    return false;
  }
  return isTokenValid(authorization);
}

export function isTokenValid(authorization: string): boolean {
  if (!process.env.SECRET) {
    console.log('verifying failed, missing secret');
    return false;
  }

  const token = getTokenFrom(authorization);

  if (!token) {
    return false;
  }

  const decodedToken = jsonwebtoken.verify(
    token,
    process.env.SECRET
  ) as JwtPayload;
  return !!decodedToken.id;
}

function getTokenFrom(authorization: string): string | null {
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  return null;
}
