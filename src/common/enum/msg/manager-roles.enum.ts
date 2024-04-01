/**
 * Enumeration of operation types for rol management actions.
 * Each member represents a specific rol-related operation in the application.
 */
export enum RolesMsgEnum {
  CREATE = 'CREATE_ROL', // Represents the action of creating a rol.
  FIND = 'FIND_ROL', // Represents the action of finding rols.
  FIND_BY_ID = 'FIND_BY_ID_ROL', // Represents the action of finding a rol by their ID.
  FIND_ONE = 'FIND_ONE_ROL', // Represents the action of finding a single rol.
  UPDATE = 'UPDATE_ROL', // Represents the action of updating a rol's information.
  PATCH = 'PATCH_ROL', // Represents the action of partially updating a rol's information.
  DELETE = 'DELETE_ROL', // Represents the action of deleting a rol.
  VALID = 'VALID_ROL', // Represents the action of validating a rol.
  TOTAL = 'TOTAL_ROL', // Represents the action of counting the total number
}
