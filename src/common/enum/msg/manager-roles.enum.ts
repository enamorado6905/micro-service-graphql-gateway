/**
 * Enumeration of operation types for role management actions.
 * Each member represents a specific role-related operation in the application.
 */
export enum RolesMsgEnum {
  CREATE = 'CREATE_ROLE', // Represents the action of creating a role.
  FIND = 'FIND_ROLE', // Represents the action of finding roles.
  FIND_BY_ID = 'FIND_BY_ID_ROLE', // Represents the action of finding a role by their ID.
  FIND_ONE = 'FIND_ONE_ROLE', // Represents the action of finding a single role.
  UPDATE = 'UPDATE_ROLE', // Represents the action of updating a role's information.
  PATCH = 'PATCH_ROLE', // Represents the action of partially updating a role's information.
  DELETE = 'DELETE_ROLE', // Represents the action of deleting a role.
  VALID = 'VALID_ROLE', // Represents the action of validating a role.
  TOTAL = 'TOTAL_ROLE', // Represents the action of counting the total number
}
