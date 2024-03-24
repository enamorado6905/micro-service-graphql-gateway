/**
 * Enumeration of operation types for user management actions.
 * Each member represents a specific user-related operation in the application.
 */
export enum UsersMsgEnum {
  CREATE = 'CREATE_USER', // Represents the action of creating a user.
  FIND = 'FIND_USER', // Represents the action of finding users.
  FIND_BY_ID = 'FIND_BY_ID_USER', // Represents the action of finding a user by their ID.
  FIND_ONE = 'FIND_ONE_USER', // Represents the action of finding a single user.
  UPDATE = 'UPDATE_USER', // Represents the action of updating a user's information.
  PATCH = 'PATCH_USER', // Represents the action of partially updating a user's information.
  PATCH_PASSWORD = 'PATCH_PASSWORD', // Represents the action of updating a user's password.
  DELETE = 'DELETE_USER', // Represents the action of deleting a user.
  VALID = 'VALID_USER', // Represents the action of validating a user.
  TOTAL = 'TOTAL_USER', // Represents the action of retrieving the total number of users.
}
