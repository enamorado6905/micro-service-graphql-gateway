import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { VALIDATION_PIPE } from './common/util/constants/constants.conts';
import { AllExceptionFilter } from './common/filter/all-exception.filter';
import { TimeOutInterceptor } from './common/intercertors/timeout.interceptor';
import { json, urlencoded } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';

/**
 * The main bootstrap function for the NestJS application.
 * It initializes and configures the application settings.
 */
async function bootstrap() {
  // Create a NestJS application instance with the AppModule.
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve static assets from the specified directory.
  app.useStaticAssets(join(__dirname, '../../public'));

  // Apply global validation pipes with specified configuration.
  app.useGlobalPipes(new ValidationPipe(VALIDATION_PIPE));

  // Set up a global exception filter for handling all exceptions.
  app.useGlobalFilters(new AllExceptionFilter());

  // Apply a global interceptor for handling timeouts.
  app.useGlobalInterceptors(new TimeOutInterceptor());

  // Configure express to parse JSON and URL-encoded data with specific size limits.
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  // Enable Cross-Origin Resource Sharing (CORS) for the application.
  app.enableCors();

  // Start listening for incoming requests on the specified port.
  await app.listen(process.env.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Application is running on: ${process.env.PORT}`);
}

// Call the bootstrap function to start the application.
bootstrap();
