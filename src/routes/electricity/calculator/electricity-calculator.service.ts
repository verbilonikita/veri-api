import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  IElectricityPlan,
  IElectricityPlanResponse,
} from './electricitiy-calculator.types';
import { RateCalculatorService } from '../../../services/electricity.service';
import DB from 'src/db';
import { DB_QUERIES } from 'src/db/db.const';

@Injectable()
export class ElectricityCalculatorService {
  constructor(private ratesCalculatorService: RateCalculatorService) {}

  public async getRates(kwh: number) {
    try {
      const data = await DB.run(DB_QUERIES.GET_PLANS);
      const modifiedData = this.modifyData(data, kwh);
      return modifiedData;
    } catch {
      throw new HttpException(
        'Unable to access db.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private modifyData(data: IElectricityPlan[], kwh: number) {
    return data.map((rate) => {
      const updatedRate: IElectricityPlanResponse = {
        name: rate.name,
        cost: undefined,
      };

      if (rate.includedKwh) {
        const leftOver = kwh - rate.includedKwh;
        const additionalCost =
          leftOver > 0 ? (leftOver * rate.additionalKwhCost) / 100 : 0;
        updatedRate.cost = rate.baseCost + additionalCost;
      } else {
        const baseCost = rate.baseCost * 12;
        const additionalCost = (kwh * rate.additionalKwhCost) / 100;
        updatedRate.cost = baseCost + additionalCost;
      }

      updatedRate.cost = this.ratesCalculatorService.roundToCent(
        updatedRate.cost,
        2,
      );
      return updatedRate;
    });
  }
}
