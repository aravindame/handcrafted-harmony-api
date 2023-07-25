/**
 * Retrieves the configuration object based on the current environment.
 * @returns {Promise<object>} A promise that resolves to the configuration object.
 */
export async function getConfig() {
  try {
    const envConfig = await (process.env?.NODE_ENV === "production"
      ? import("../config/prod.config.json")
      : import("../config/dev.config.json"));

    return envConfig;
  } catch (error) {
    throw new Error("Failed to retrieve configuration.");
  }
}