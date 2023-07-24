import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import {
  IElectricityPlan,
  IElectricityPlanResponse,
  IMockDB,
} from './electricitiy-calculator.types';
import { db } from './electricity-calculator.const';
import { RateCalculatorService } from '../../../services/electricity.service';

@Injectable()
export class ElectricityCalculatorService {
  constructor(private ratesCalculatorService: RateCalculatorService) {}

  public async getRates(kwh: number) {
    try {
      const json = await readFile(db.location, db.encoding);
      const data: IMockDB = JSON.parse(json);
      const modifiedData = this.modifyData(data.options, kwh);
      const sortedData = this.sortData(modifiedData);
      return sortedData;
    } catch {
      throw new HttpException(
        'Unable to access db.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private sortData(data: IElectricityPlanResponse[]) {
    return data.sort((a, b) => a.cost - b.cost);
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
