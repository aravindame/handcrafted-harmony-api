import { auth } from 'express-oauth2-jwt-bearer';
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
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  tokenSigningAlg: process.env.TOKEN_SIGNING_ALG,
});