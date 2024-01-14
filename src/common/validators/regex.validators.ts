/**
 * A collection of regular expression patterns for various types of string validations.
 */
export const regexValidatorPatterns = {
  /**
   * Regex pattern to match only numbers.
   * It allows any number of digits but no other characters.
   */
  ONLY_NUMBER: '^[0-9]*$',

  /**
   * Regex pattern for alpha-numeric characters including spaces, hyphens, and underscores.
   * It also supports accented characters commonly used in Spanish.
   */
  ALPHA_NUMERIC: '^[0-9a-zA-Z _-áéíóúÁÉÍÓÚñÑ]+$',

  /**
   * Regex pattern for validating email addresses.
   * It supports lowercase letters, numbers, periods, percent signs, plus signs, and hyphens in the user name part,
   * and requires a domain name with a two to four letter domain.
   */
  EMAIL: '^[a-z0-9._%+-]+@[a-z0-9.-]+[.]+[a-z]{2,4}$',

  /**
   * Regex pattern to match only letters including spaces, hyphens, and underscores.
   * Similar to ALPHA_NUMERIC, it supports accented characters.
   */
  ONLY_LETTERS: '^[a-zA-Z _-áéíóúÁÉÍÓÚ]*$',

  /**
   * Regex pattern for a strong password.
   * Requires at least 8 characters and a maximum of 50, including at least one uppercase letter,
   * one lowercase letter, one digit, no spaces, and at least one special character.
   */
  STRONG_PASSWORD:
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])([A-Za-z\\d$@$!%*?&]|[^ ]){8,50}$',

  /**
   * Regex pattern for phone numbers.
   * Allows optional country code, spaces, and hyphens, with a minimum of 6 digits and a maximum of 14.
   */
  PHONE: '^(?:[+]{1})?(?:([0-9]{1,2}) ?)?(?:[0-9] ?-?){6,14}[0-9]$',
};
