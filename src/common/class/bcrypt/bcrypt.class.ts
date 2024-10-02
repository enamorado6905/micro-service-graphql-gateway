import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

/**
 * @Injectable() marks the class as a provider that can be managed by Nest IoC container.
 * BcryptUtil is a utility class that provides static methods for hashing and comparing passwords using bcrypt.
 */
@Injectable()
export class BcryptClass {
  /**
   * Asynchronously hashes a password.
   *
   * This function manages the password hashing process by:
   * 1. Generating a salt using the provided salt rounds.
   * 2. Hashing the provided password using the generated salt.
   * 3. Returning a promise that resolves to the hashed password.
   *
   * @param {string} password - The password to be hashed.
   * @param {number} saltRounds - The number of rounds to use when generating the salt.
   * @returns {Promise<string>} A promise that resolves to the hashed password.
   */
  static async hashPassword(
    password: string,
    saltRounds: number,
  ): Promise<string> {
    const genSalt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, genSalt);
  }

  /**
   * Asynchronously hashes a password.
   *
   * This function manages the password hashing process by:
   * 1. Generating a salt using the provided salt rounds.
   * 2. Hashing the provided password using the generated salt.
   * 3. Returning a promise that resolves to the hashed password.
   *
   * @param {string} password - The password to be hashed.
   * @param {number} saltRounds - The number of rounds to use when generating the salt.
   * @returns {Promise<string>} A promise that resolves to the hashed password.
   */
  static hashSyncPassword(password: string, saltRounds: number): string {
    return bcrypt.hashSync(password, saltRounds);
  }

  /**
   * Asynchronously compares a password and a hashed password.
   *
   * This function manages the password comparison process by:
   * 1. Comparing the provided password and hashed password using bcrypt.
   * 2. Returning a promise that resolves to true if the password and the hashed password match, false otherwise.
   *
   * @param {string} password - The password to compare.
   * @param {string} hashedPassword - The hashed password to compare.
   * @returns {Promise<boolean>} A promise that resolves to true if the password and the hashed password match, false otherwise.
   */
  static async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
