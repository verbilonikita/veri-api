import { Routes } from '@nestjs/core';
import { ElectricityModule } from './routes/electricity/electricity.module';
import { ErrorModule } from './routes/error/error.module';

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
