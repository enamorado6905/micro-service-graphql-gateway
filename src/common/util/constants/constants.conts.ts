/**
 * JWT authentication constants.
 */
export const JWT_AUTH = {
  /**
   * The secret key used for JWT token generation and verification.
   * Defaults to 'MySecretSeedHere' if not provided in the environment variables.
   */
  secret: process.env.JWT_SECRET || 'MySecretSeedHere',

  /**
   * The expiration time for JWT tokens.
   * Defaults to '12h' if not provided in the environment variables.
   */
  expireIn: process.env.JWT_EXPIRES_IN || '12h',
};

/**
 * Validation pipe constants.
 */
export const VALIDATION_PIPE = {
  /**
   * If set to true, the validation pipe will whitelist the incoming data,
   * removing any properties that are not defined in the DTO.
   */
  whitelist: true,

  /**
   * If set to true, the validation pipe will forbid any properties that are not defined in the DTO.
   */
  forbidNonWhitelisted: true,

  /**
   * If set to true, the validation pipe will automatically transform the incoming data
   * to match the DTO's property types.
   */
  transform: true,
};

/**
 * The error message displayed when a query doesn't match the schema.
 */
export const FORMATTED_ERROR =
  "Your query doesn't match the schema. Try double-checking it!";
