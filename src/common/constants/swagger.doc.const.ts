/**
 * Swagger document configuration for API 1.0.
 */
import { DocumentBuilder } from '@nestjs/swagger';

export const labelSwagger = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('API 1.0 documentations')
  .setDescription('Documentation about API 1.0 endpoints')
  .setVersion('1.0')
  .addTag('user')
  .build();
