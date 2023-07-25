/**
 * Express application with middleware and routes.
 * @module app
 * @author Aravinda Meewalaarachchi
 */

import * as cors from 'cors';
import * as express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { errorHandler } from './middleware/error.handler';
import logger from './util/logger.util';
import orderRoutes from './routes/orders.routes';
import { getConfig } from './util/config.util';
import productRoutes from './routes/products.routes';
import analyticsRoutes from './routes/analytics.routes';

const app: express.Application = express();
let config = null;

/**
 * Applies routes to the Express application.
 */
function applyRoutes(): void {
 logger?.info(`Applying application routes`);
  app.use(config['api-prefix'], orderRoutes);
  app.use(config['api-prefix'], productRoutes);
  app.use(config['api-prefix'], analyticsRoutes);
}

/**
 * Applies middleware to the Express application.
 */
async function applyMiddleware(): Promise<void> {
  logger?.info(`Applying application middleware`);
  config = await getConfig()
  app.use(express.json());
  app.use(helmet());
  app.use(errorHandler);
  app.use(cors(config?.cors));
  app.use(rateLimit(config?.rateLimit));
}

(async () => {
  await applyMiddleware();
  applyRoutes();
})();

export default app;
