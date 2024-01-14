/**
 * Represents the structure for a left join operation in a database query.
 */
export interface LeftJoinInterface {
  /**
   * The entity (table or relation) to join with. It is advised to replace 'any' with
   * a more specific type representing database entities for type safety.
   */
  entity: any;

  /**
   * The alias to assign to the joined entity. This alias is used for referencing
   * the entity in the query.
   */
  alias: string;

  /**
   * An optional condition to specify the join criteria. This is a string representing
   * the condition (e.g., "table1.column1 = table2.column2") for joining.
   */
  condition?: string;

  /**
   * An optional object containing parameters to be used in the join condition. These
   * parameters help in safely injecting values into the condition, useful in parameterized queries.
   * The type 'object' can be replaced with a more specific type for better type safety.
   */
  parameters?: object;
}
