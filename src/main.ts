import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { Logger, ValidationPipe } from '@nestjs/common';
import { VALIDATION_PIPE } from './common/util/constants/constants.conts';
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

  // Apply a global interceptor for handling timeouts.
  app.useGlobalInterceptors(new TimeOutInterceptor());

  // Configure express to parse JSON and URL-encoded data with specific size limits.
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  // Enable Cross-Origin Resource Sharing (CORS) for the application.
  app.enableCors();

  // Start listening for incoming requests on the specified port.
  await app.listen(process.env.PORT);
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}

// Call the bootstrap function to start the application.
bootstrap();
