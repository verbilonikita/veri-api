import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomExceptions } from './middleware/exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new CustomExceptions());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
