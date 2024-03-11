/**
 * Retrieves the configuration settings for the application.
 * @returns {Object} The configuration object.
 */
export default (): object => ({
  PORT: parseInt(process.env.PORT, 10) || 3000,
  DB: {
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_CONNECTION: process.env.DB_CONNECTION,
  },
  JWT: {
    AUTH_HASH_ROUNDS: process.env.AUTH_HASH_ROUNDS,
  },
  COGNITO_USER_POOL_ID: process.env.COGNITO_USER_POOL_ID,
  COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID,
  COGNITO_CLIENT_ID_SECRET: process.env.COGNITO_CLIENT_ID_SECRET,
  COGNITO_REGION: process.env.COGNITO_REGION,
  COGNITO_AUDIENCE: process.env.COGNITO_AUDIENCE,
  COGNITO_JWKS_URI: process.env.COGNITO_JWKS_URI,
  COGNITO_ISSUER_URI: process.env.COGNITO_ISSUER_URI,
  AUTH: {
    AUTH_HASH_ROUNDS: process.env.DB_CONNECTION,
  },
});
