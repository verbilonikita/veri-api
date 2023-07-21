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

export { IElectricityPlan, IMockDB, IElectricityPlanResponse };
