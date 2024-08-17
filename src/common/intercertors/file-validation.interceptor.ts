import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

/**
 * A NestJS pipe to validate the size and type of an uploaded file.
 */
@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(file: any, metadata: ArgumentMetadata) {
    if (!file) {
      throw new BadRequestException('Validation failed: No file uploaded');
    }

    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxSize) {
      throw new BadRequestException(
        `Validation failed: File size exceeds ${maxSize / (1024 * 1024)} MB`,
      );
    }

    if (
      file.mimetype !== 'image/jpg' &&
      file.mimetype !== 'image/jpeg' &&
      file.mimetype !== 'image/png'
    ) {
      throw new BadRequestException('Validation failed: Invalid file type');
    }

    return file;
  }
}
