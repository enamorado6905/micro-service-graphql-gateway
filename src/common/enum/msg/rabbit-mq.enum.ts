/**
 * Enumeration for RabbitMQ queue names used in the application.
 * This enum provides named constants for different queues.
 */
export enum RabbitMqEnum {
  usersQueue = 'users', // Queue name for user-related operations.
  cognitoQueue = 'manager-cognito', // Queue name for manager-cognito operations.
}
