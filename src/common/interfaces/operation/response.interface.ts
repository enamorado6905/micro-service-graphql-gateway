/**
 * Interface for representing a standard response structure in an application.
 * This can be used to structure general response data, including messages and response content.
 */
export interface ResponseInterface {
  /**
   * A message associated with the response, typically used to provide a brief description
   * or status of the response, such as "success" or "error occurred".
   */
  message: string;

  /**
   * A generic response object. This can hold any type of data associated with the response,
   * such as the result of a query, data retrieval, or any other information.
   * Consider using a more specific type than 'any' for enhanced type safety and clarity,
   * depending on the context of your application.
   */
  response: any; // Consider replacing 'any' with a more specific type if applicable.
}
