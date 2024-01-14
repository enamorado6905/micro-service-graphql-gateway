import { compare, hash } from 'bcrypt';

export const CRYPT_SALT = 10;

/**
 * Hashes a string using a specified salt.
 * @param fieldToHash - The string to be hashed.
 * @returns A promise that resolves to the hashed string.
 */
export async function hashString(fieldToHash: string) {
  return await hash(fieldToHash, CRYPT_SALT);
}

/**
 * Compares a plain string with an encrypted string.
 * @param plainString - The plain string to compare.
 * @param encryptedString - The encrypted string to compare against.
 * @returns A promise that resolves to a boolean indicating whether the strings match.
 */
export async function compareString(
  plainString: string,
  encryptedString: string,
) {
  return await compare(plainString, encryptedString);
}
