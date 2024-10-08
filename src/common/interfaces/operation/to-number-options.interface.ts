/**
 * Interface for specifying options in the toNumber function.
 * This includes settings for default value, minimum, and maximum values.
 */
export interface ToNumberOptions {
  /**
   * The default value to return if the conversion fails.
   * If the conversion results in NaN, this value will be used as a fallback.
   */
  default?: number;

  /**
   * The minimum allowed value after conversion. If the converted number is less than this,
   * the minimum value will be used instead.
   */
  min?: number;

  /**
   * The maximum allowed value after conversion. If the converted number is greater than this,
   * the maximum value will be used instead.
   */
  max?: number;
}
