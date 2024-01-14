import { ToNumberOptions } from '../interfaces/to-number-options.interface';

/**
 * Converts a string to lowercase.
 *
 * @param value - The string to convert to lowercase.
 * @returns The lowercase version of the input string.
 */
export function toLowerCase(value: string): string {
  return value.toLowerCase();
}

/**
 * Trims whitespace from both ends of a string.
 *
 * @param value - The string to trim.
 * @returns The trimmed string.
 */
export function trim(value: string): string {
  return value.trim();
}

/**
 * Converts a string to a Date object.
 *
 * @param value - The string to convert to a date.
 * @returns The Date object created from the input string.
 */
export function toDate(value: string): Date {
  return new Date(value);
}

/**
 * Converts a string to a boolean.
 *
 * @param value - The string to convert to boolean. Accepts 'true', '1' for true, other values are false.
 * @returns The boolean value of the string.
 */
export function toBoolean(value: string): boolean {
  value = value.toLowerCase();
  return value === 'true' || value === '1';
}

/**
 * Converts a string to a number, with optional constraints.
 *
 * @param value - The string to convert to a number.
 * @param opts - An object containing optional parameters: default, min, and max.
 * @returns The number after conversion and applying constraints, if any.
 */
export function toNumber(value: string, opts: ToNumberOptions = {}): number {
  let newValue: number = Number.parseInt(value || String(opts.default), 10);

  // If the conversion results in NaN, use the default value if provided.
  if (Number.isNaN(newValue)) {
    newValue = opts.default;
  }

  // Apply minimum and maximum constraints if they are provided.
  if (opts.min !== undefined && newValue < opts.min) {
    newValue = opts.min;
  }
  if (opts.max !== undefined && newValue > opts.max) {
    newValue = opts.max;
  }

  return newValue;
}
