import { IsNumber } from 'class-validator';

interface IMockDB {
  options: IElectricityPlan[];
}

interface IElectricityPlan {
  name: string;
  type: number;
  baseCost: number;
  additionalKwhCost: number;
  includedKwh?: number;
}

interface IElectricityPlanResponse {
  name: IElectricityPlan['name'];
  cost: number;
}

export class YourDtoClass {
  @IsNumber()
  kwh: number;
}

export { IElectricityPlan, IMockDB, IElectricityPlanResponse };
