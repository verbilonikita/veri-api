import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomExceptions } from './middleware/exception-filter';
import DB from './db';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new CustomExceptions());
    app.enableCors();
    await DB.init();
    await app.listen(3000);
  } catch (err) {
    console.log('connection is closed');
    DB.close();
  }
}
bootstrap();
