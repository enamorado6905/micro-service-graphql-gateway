/**
 * Enumeration of operation types for client cognito actions.
 * Each member of this enum represents a specific operation type.
 */
export enum ManagerClientCognitoMsgEnum {
  CREATE = 'CREATE_CLIENT_COGNITO', // Represents the action of creating an client cognito.
  FIND = 'FIND_CLIENT_COGNITO', // Represents the action of finding client cognitos.
  FIND_BY_ID = 'FIND_BY_ID_CLIENT_COGNITO', // Represents the action of finding an client cognito by ID.
  FIND_ONE = 'FIND_ONE_CLIENT_COGNITO', // Represents the action of finding a single client cognito.
  UPDATE = 'UPDATE_CLIENT_COGNITO', // Represents the action of updating an client cognito.
  DELETE = 'DELETE_CLIENT_COGNITO', // Represents the action of deleting an client cognito.
  TOTAL = 'TOTAL_CLIENT_COGNITO', // Represents the action of counting the total number of client cognitos.
}
