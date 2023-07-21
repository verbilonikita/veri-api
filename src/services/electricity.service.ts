import { Injectable } from '@nestjs/common';

@Injectable()
export class RateCalculatorService {
  roundToCent(number: number, digits: number) {
    return parseFloat(number.toFixed(digits));
  }
}
