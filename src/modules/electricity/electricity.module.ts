import { Module } from '@nestjs/common';
import { ElectricityCalculatorController } from './calculator/electricity-calculator.controller';
import { ElectricityCalculatorService } from './calculator/electricity-calculator.service';
import { RateCalculatorService } from '../../services/electricity.service';

@Module({
  imports: [],
  controllers: [ElectricityCalculatorController],
  providers: [ElectricityCalculatorService, RateCalculatorService],
})
export class ElectricityModule {}
