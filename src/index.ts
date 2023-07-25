/**
 * Express application with server initialization.
 * @module app
 * @author Aravinda Meewalaarachchi
 */

import logger from './util/logger.util';
import * as dotenv from 'dotenv';
import app from './app'

let server: any = null;

/**
 * Initializes the Express application, configures environment variables, and starts the server.
 */
(async () => {
  await extractEnvConfigurations();
  initUncaughtExceptionHandler();
  await dbConnection();
  await startServer();
})();

/**
 * Extracts environment configurations from the .env file.
 * @throws {Error} If an error occurs while extracting environment variables.
 */
async function extractEnvConfigurations(): Promise<void> {
  const { error } = await dotenv.config();
  if (error) {
    throw new Error("An error occurred while extracting environment variables from .env file.");
  }
}

/**
 * Initializes the uncaught exception and unhandled rejection handlers.
 */
function initUncaughtExceptionHandler(): void {
  process.on('uncaughtException', (ex: Error) => logger?.error(ex.message, ex));
  process.on('unhandledRejection', (ex: Error) => logger?.error(ex.message, ex));
}

/**
 * Establishes a database connection.
 * @throws {Error} If an error occurs while establishing the database connection.
 */
async function dbConnection(): Promise<void> {
  try {
    const { connect } = await import('./database/db.mongo');
    await connect();
  } catch (error) {
    process.exit(1);
  }
}

/**
 * Starts the server and listens on the specified port.
 * @throws {Error} If an error occurs while starting the server.
 */
async function startServer(): Promise<void> {
  const port = process.env.PORT || 3001;
  server = await app.listen(port, () => console.info(`Listening on port ${port}`));
  server.on('error', (error: Error) => {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  });
}

/**
 * Retrieves the server instance.
 * @returns The server instance.
 */
export default function getServer(): any {
  return server;
}
