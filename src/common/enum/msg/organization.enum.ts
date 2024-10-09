/**
 * Enumeration of operation types for organization management actions.
 * Each member represents a specific organization-related operation in the application.
 */
export enum OrganizationMsgEnum {
  CREATE = 'CREATE_ORGANIZATION', // Represents the action of creating a organization.
  FIND = 'FIND_ORGANIZATION', // Represents the action of finding organizations.
  FIND_BY_ID = 'FIND_BY_ID_ORGANIZATION', // Represents the action of finding a organization by their ID.
  FIND_ONE = 'FIND_ONE_ORGANIZATION', // Represents the action of finding a single organization.
  UPDATE = 'UPDATE_ORGANIZATION', // Represents the action of updating a organization's information.
  PATCH = 'PATCH_ORGANIZATION', // Represents the action of partially updating a organization's information.
  DELETE = 'DELETE_ORGANIZATION', // Represents the action of deleting a organization.
  REMOVE = 'REMOVE_ORGANIZATION', // Represents the action of deleting a organization.
  DELETE_EMAIL = 'DELETE_EMAIL', // Represents the action of deleting a organization.
  VALID = 'VALID_ORGANIZATION', // Represents the action of validating a organization.
  TOTAL = 'TOTAL_ORGANIZATION', // Represents the action of counting the total number
}
