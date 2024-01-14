/**
 * Interface for representing the response data upon a successful sign-in.
 * Includes details such as the access token and user information.
 */
export interface SignInInterface {
  /**
   * The access token provided upon successful authentication.
   * This token is typically used for securing subsequent requests by the user.
   */
  accessToken: string;

  /**
   * User information object. This could include details about the user who has
   * Signed in. Consider replacing 'any' with a more specific type for enhanced
   * Type safety and to provide a clearer structure of the user object expected
   * By your application.
   */
  user: any; //TODO: Consider replacing 'any' with a specific user type.
}
