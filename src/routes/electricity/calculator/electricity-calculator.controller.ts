import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { ElectricityCalculatorService } from './electricity-calculator.service';
import { YourDtoClass } from './electricitiy-calculator.types';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Controller('calculate')
export class ElectricityCalculatorController {
  constructor(
    private electricityCalculatorService: ElectricityCalculatorService,
  ) {}

  @Post()
  async calculateKWH(
    @Body(new ValidationPipe()) body: YourDtoClass,
    @Res() res: Response,
  ) {
    try {
      const data = await this.electricityCalculatorService.getRates(body.kwh);
      res.status(200).send({
        message: 'updated',
        data: data,
      });
    } catch (err) {
      throw new HttpException(
        'Something went wrong, please try again.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
