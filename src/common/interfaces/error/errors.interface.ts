/**
 * Interface for representing error details in an application.
 * This can be used to structure error-related information, such as messages and error objects.
 */
export interface ErrorsInterface {
  /**
   * An optional error message, typically a string that describes the error in a human-readable format.
   * This can be used to convey concise information about the error to the end user or developer.
   */
  message?: string;

  /**
   * An optional generic error object. This can be used to store more detailed error information or
   * a specific error type. The use of 'any' type allows flexibility but consider using a more specific
   * type for enhanced type safety and clarity in the context of your application.
   */
  error?: any; // Consider replacing 'any' with a more specific error type if applicable.
}
