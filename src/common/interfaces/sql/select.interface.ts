/**
 * Interface for representing the selection structure in a database query.
 * Defines the columns to be selected and their optional aliases.
 */
export interface SelectInterface {
  /**
   * Specifies the column or columns to be selected in the query.
   * This could be a single column name or a comma-separated list of multiple column names.
   */
  selection: string;

  /**
   * An optional alias name for the selection. This alias can be used for renaming
   * the selected column(s) in the output of the query.
   */
  selectionAliasName?: string;
}
