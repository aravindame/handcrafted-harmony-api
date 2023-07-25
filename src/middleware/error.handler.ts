import { Request, Response, NextFunction } from 'express';

/**
 * Express error handler middleware.
 * Sends a 500 response with the error message.
 * @param error - The error object.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 * @author Aravinda Meewalaarachchi
 */
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error && error.message) {
    res.status(500).send(error.message);
  } else {
    next(error);
  }
};
