import { Controller, Inject, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ElectricityCalculatorService } from './electricity-calculator.service';

@Controller('calculate')
export class ElectricityCalculatorController {
  constructor(
    private electricityCalculatorService: ElectricityCalculatorService,
  ) {}

  @Post()
  async calculateKWH(@Req() req: Request, @Res() res: Response) {
    const { kwh } = req.body;
    const data = await this.electricityCalculatorService.getRates(kwh);
    res.status(200).send({
      message: 'updated',
      data: data,
    });
  }
}
