import { Module } from '@nestjs/common';
import { ElectricityModule } from './electricity/electricity.module';
import { ErrorModule } from './error/error.module';

@Module({
  imports: [ElectricityModule, ErrorModule],
})
export class AllModules {}
