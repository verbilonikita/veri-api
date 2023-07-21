import { Module } from '@nestjs/common';
import { ErrorController } from './error.controller';

@Module({
  imports: [],
  controllers: [ErrorController],
  providers: [],
})
export class ErrorModule {}
