import { join } from 'path';
import { writeFile } from 'fs/promises';
import bcrypt from 'bcrypt';
/**
 * Writes HTTP log data to a file.
 * @param data - The data to be logged.
 */
export async function writeHttpLog(data: Record<string, any>) {
  try {
    const LOGS_DIR = join(__dirname, `${Date.now()}-log.json`);
    await writeFile(LOGS_DIR, JSON.stringify(data));
  } catch (err) {
    return;
  }
}

/**
 * Checks if an element exists in an array.
 * @param element - The element to check.
 * @param array - The array to search in.
 * @returns `true` if the element exists in the array, `false` otherwise.
 */
export function arrayCheckElement(element: any, array: Array<any>): boolean {
  return array.includes(element);
}

/**
 * Checks if a password matches the hashed password stored in the database.
 * @param password - The password to check.
 * @param passwordDB - The hashed password stored in the database.
 * @returns A promise that resolves to `true` if the password matches, `false` otherwise.
 */
export async function bcryptCheckPassword(
  password: string,
  passwordDB: string,
): Promise<boolean> {
  return bcrypt.compare(password, passwordDB);
}

/**
 * Encrypts a password using bcrypt.
 * @param password - The password to encrypt.
 * @param salt - The salt value for encryption.
 * @returns A promise that resolves to the encrypted password.
 */
export async function bcryptEncryptPassword(
  password: string,
  salt: number,
): Promise<string> {
  const genSalt = await bcrypt.genSalt(salt);
  return bcrypt.hash(password, genSalt);
}

/**
 * Generates a random text of a specified length.
 * @param id - The characters to choose from for generating the random text.
 * @param long - The length of the random text.
 * @returns The generated random text.
 */
export function textRandom(id: string, long: number): string {
  let text = '';
  for (let i = 0; i < long; i++) {
    text += id.charAt(Math.floor(Math.random() * id.length));
  }
  return text;
}

/**
 * Removes whitespace from a text string.
 * @param text - The text to remove whitespace from.
 * @returns The text with whitespace removed.
 */
export function textClear(text: string): string {
  return text.replace(/\s+/g, '');
}
