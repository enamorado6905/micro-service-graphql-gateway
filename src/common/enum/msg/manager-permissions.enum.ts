/**
 * Enumeration of operation types for permission management actions.
 * Each member represents a specific permission-related operation in the application.
 */
export enum PermissionsMsgEnum {
  CREATE = 'CREATE_PERMISSION', // Represents the action of creating a permission.
  FIND = 'FIND_PERMISSION', // Represents the action of finding permissions.
  FIND_BY_ID = 'FIND_BY_ID_PERMISSION', // Represents the action of finding a permission by their ID.
  FIND_ONE = 'FIND_ONE_PERMISSION', // Represents the action of finding a single permission.
  UPDATE = 'UPDATE_PERMISSION', // Represents the action of updating a permission's information.
  PATCH = 'PATCH_PERMISSION', // Represents the action of partially updating a permission's information.
  DELETE = 'DELETE_PERMISSION', // Represents the action of deleting a permission.
  VALID = 'VALID_PERMISSION', // Represents the action of validating a permission.
  TOTAL = 'TOTAL_PERMISSION', // Represents the action of counting the total number
}
