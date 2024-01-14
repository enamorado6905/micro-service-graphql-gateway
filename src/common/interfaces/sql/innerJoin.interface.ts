/**
 * Represents the structure for an inner join operation in a database query.
 */
export interface InnerJoinInterface {
  /**
   * The entity (table or relation) to join with.
   */
  entity: any; // Ideally, this should be a specific type representing database entities.

  /**
   * The alias to assign to the joined entity, used for referencing in the query.
   */
  alias: string;

  /**
   * An optional condition to specify the join criteria.
   * This is a string representing the condition (e.g., "table1.column1 = table2.column2").
   */
  condition?: string;

  /**
   * An optional object containing parameters to be used in the join condition.
   * These parameters can be used to safely inject values into the condition (e.g., for parameterized queries).
   */
  parameters?: object; // The object type might be replaced with a more specific type if needed.
}
