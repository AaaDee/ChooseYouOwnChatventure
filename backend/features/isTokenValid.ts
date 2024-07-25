import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

export function isTokenValid(request: Request): boolean {
  if (!process.env.SECRET) {
    console.log('verifying failed, missing secret');
    return false;
  }

  const decodedToken = jsonwebtoken.verify(
    getTokenFrom(request),
    process.env.SECRET
  ) as JwtPayload;
  return !!decodedToken?.id;
}

function getTokenFrom(request: Request): string {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  return '';
}
