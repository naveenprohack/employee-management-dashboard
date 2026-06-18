import jwt from 'jsonwebtoken';

export function requireAuth(req, _res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    const error = new Error('Authentication token is required.');
    error.statusCode = 401;
    return next(error);
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'dev-only-secret');
    return next();
  } catch {
    const error = new Error('Invalid or expired authentication token.');
    error.statusCode = 401;
    return next(error);
  }
}
