/**
 * Interface for representing the 'WHERE' clause structure in a database query.
 * It defines the condition (validator) and the parameters for that condition.
 */
export interface WhereInterface {
  /**
   * A string representing the condition for the 'WHERE' clause. This could be
   * a simple condition like "column = value" or a more complex one involving
   * multiple columns and operators.
   */
  validator: string;

  /**
   * An object containing parameters used in the 'WHERE' clause. These parameters
   * are typically used to safely inject values into the condition, avoiding SQL injection.
   * The type 'object' can be replaced with a more specific type for better type safety.
   */
  parameters: object;
}
