/**
 * Enumeration of operation types for authentication user actions.
 * Each member of this enum represents a specific operation type.
 */
export enum AuthUsersMsgEnum {
  CREATE = 'CREATE_AUTH_USER', // Represents the action of creating an authentication user.
  LOGIN_USER = 'LOGIN_AUTH_USER', // Represents the action of logging in an authentication user.
  LOGIN_USER_CUSTOM = 'LOGIN_USER_CUSTOM', // Represents the action of logging in an authentication user.
  FIND_TOKEN_FOR_CODE = 'FIND_TOKEN_FOR_CODE',
  LOGOUT_USER = 'LOGOUT_AUTH_USER', // Represents the action of logging out an authentication user.
  REFRESH_USER = 'REFRESH_AUTH_USER', // Represents the action of refreshing an authentication user's tokens.
  CONFIG_SIGN_UP = 'CONFIG_SIGN_UP', // Represents the action of confirming an authentication user's sign up.
  CONFIG_REMOVE_USER = 'CONFIG_REMOVE_USER', // Represents the action of confirming the removal of an authentication user.
  CONFIG_RESEND_CONFIRMATION_CODE_USER = 'CONFIG_RESEND_CONFIRMATION_CODE_USER', // Represents the action of resending a confirmation code to an authentication user.
  INITIATE_ACCOUNT_RECOVERY = 'INITIATE_ACCOUNT_RECOVERY', // Represents the action of initiating account recovery for an authentication user.
  CONFIRM_ACCOUNT_RECOVERY = 'CONFIRM_ACCOUNT_RECOVERY', // Represents the action of confirming account recovery for an authentication
  FIND = 'FIND_AUTH_USER', // Represents the action of finding authentication users.
  FIND_BY_ID = 'FIND_BY_ID_AUTH_USER', // Represents the action of finding an authentication user by ID.
  FIND_ONE = 'FIND_ONE_AUTH_USER', // Represents the action of finding a single authentication user.
  UPDATE = 'UPDATE_AUTH_USER', // Represents the action of updating an authentication user.
  DELETE = 'DELETE_AUTH_USER', // Represents the action of deleting an authentication user.
}
