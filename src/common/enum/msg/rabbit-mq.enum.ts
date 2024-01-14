/**
 * Enumeration for RabbitMQ queue names used in the application.
 * This enum provides named constants for different queues.
 */
export enum RabbitMqEnum {
  usersQueue = 'users', // Queue name for user-related operations.
  authUsersQueue = 'authUsers', // Queue name for authentication user-related operations.
}
