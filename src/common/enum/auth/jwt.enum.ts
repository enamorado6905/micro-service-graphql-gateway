/**
 * Enum representing the types of JWT (JSON Web Tokens) used in the application.
 * This enum provides named constants for different token types.
 */
export enum JwtEnum {
  Jwt = 'jwt', // Represents a general JWT token.
  AccessToken = 'accessToken', // Represents an access token, typically used for accessing secured routes or services.
  JwtRefreshToken = 'jwtRefreshToken', // Represents a JWT refresh token, used for obtaining a new access token.
}
