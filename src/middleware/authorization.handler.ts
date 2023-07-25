import { claimIncludes } from 'express-oauth2-jwt-bearer';
import { Handler } from 'express';
/**
 * Middleware that checks if the request contains a specific role claim for 'admin'.
 * This middleware is typically used for protecting routes that require 'admin' access.
 * @param req - The Express Request object.
 * @param res - The Express Response object.
 * @param next - The next middleware function.
 */
export const role: Handler = claimIncludes('admin');