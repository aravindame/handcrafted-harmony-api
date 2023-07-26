import { auth } from 'express-openid-connect';
import { Handler } from 'express';

import * as dotenv from 'dotenv';
(async()=>await dotenv.config())();

/**
 * Middleware that performs JWT authentication using the OAuth2 JWT bearer token flow.
 * It verifies the authenticity and validity of the incoming JWT token before allowing access to the protected routes.
 * @param req - The Express Request object.
 * @param res - The Express Response object.
 * @param next - The next middleware function in the Express middleware chain.
 */
export const authenticated: Handler = auth({
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_CLIENT_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
});