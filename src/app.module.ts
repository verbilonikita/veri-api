import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { routes } from './app.router';
import { AllModules } from './routes/all-modules.module';

@Module({
  imports: [AllModules, RouterModule.register(routes)],
  controllers: [],
  providers: [],
})
export class AppModule {}
