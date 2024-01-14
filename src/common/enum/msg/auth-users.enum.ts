/**
 * Enumeration of operation types for authentication user actions.
 * Each member of this enum represents a specific operation type.
 */
export enum AuthUsersMsgEnum {
  CREATE = 'CREATE_AUTH_USER', // Represents the action of creating an authentication user.
  FIND = 'FIND_AUTH_USER', // Represents the action of finding authentication users.
  FIND_BY_ID = 'FIND_BY_ID_AUTH_USER', // Represents the action of finding an authentication user by ID.
  FIND_ONE = 'FIND_ONE_AUTH_USER', // Represents the action of finding a single authentication user.
  UPDATE = 'UPDATE_AUTH_USER', // Represents the action of updating an authentication user.
  DELETE = 'DELETE_AUTH_USER', // Represents the action of deleting an authentication user.
}
