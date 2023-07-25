import { format, createLogger, transports, Logger } from "winston";
import { getConfig } from "./config.util";

const { combine, timestamp, label, prettyPrint } = format;

let loggerInstance: Logger | null = null;

/**
 * Retrieves the logger instance if it has been initialized, otherwise throws an error.
 * @returns The Winston logger instance.
 * @throws Error if the logger has not been initialized.
 */
function getLoggerInstance(): Logger {
  if (!loggerInstance) {
    throw new Error("Logger has not been initialized.");
  }
  return loggerInstance;
}

// Immediately invoked function expression (IIFE) to initialize the logger.
(async () => {
  await initLogger();
  getLoggerInstance();
})();

/**
 * Initializes the logger with the configuration obtained from the environment.
 */
async function initLogger() {
  const envConfig = await getConfig();
  loggerInstance = createLogger({
    level: envConfig?.logger?.level,
    format: combine(
      label({ label: envConfig?.logger?.label }),
      timestamp({ format: envConfig?.logger?.timestamp.format }),
      prettyPrint()
    ),
    transports: [
      new transports.File(envConfig?.logger?.levelInfo),
      new transports.File(envConfig?.logger?.levelError),
      new transports.Console(),
    ],
  });
}

export default loggerInstance;
