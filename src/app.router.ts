import { Routes } from '@nestjs/core';
import { ElectricityModule } from './modules/electricity/electricity.module';
import { ErrorModule } from './modules/error/error.module';

export const routes: Routes = [
  {
    path: 'electricity',
    module: ElectricityModule,
  },
  {
    path: '*',
    module: ErrorModule,
  },
];
