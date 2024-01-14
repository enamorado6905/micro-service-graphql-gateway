import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { errorExceptions } from '../errors/exception-errors';
import { ApolloServerErrorCode } from '@apollo/server/errors';

/**
 * A NestJS pipe to validate the size and type of an uploaded file.
 */
@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  /**
   * Transforms and validates an incoming file.
   *
   * @param file - The uploaded file to validate.
   * @param metadata - Additional metadata for the transformation, not used in this pipe.
   * @throws {BadRequestException} If no file is provided.
   * @throws {ApolloServerErrorCode.PERSISTED_QUERY_NOT_FOUND} If the file size or type is invalid.
   * @returns The validated file if no validation errors occur.
   */
  transform(file: Express.Multer.File, metadata: ArgumentMetadata) {
    // Check if the file is provided, throw an exception if not.
    if (!file) {
      throw new BadRequestException('Validation failed: file is null');
    }

    console.log('metadata', metadata);

    // Validate file size, throw an exception if it exceeds the limit.
    if (file.size > 3000000000000000) {
      errorExceptions(
        ApolloServerErrorCode.PERSISTED_QUERY_NOT_FOUND,
        'Validation failed: size too large',
      );
    }

    // Validate file type, allowing only jpg, jpeg, and png.
    if (
      file.mimetype !== 'image/jpg' &&
      file.mimetype !== 'image/jpeg' &&
      file.mimetype !== 'image/png'
    ) {
      errorExceptions(
        ApolloServerErrorCode.PERSISTED_QUERY_NOT_FOUND,
        'Validation failed: incorrect file type',
      );
    }

    // Return the file if all validations pass.
    return file;
  }
}
