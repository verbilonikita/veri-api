import { Database } from 'sqlite3';
import { DB_ENUM, DB_QUERIES, plans } from './db.const';
import {
  IElectricityPlan,
  IMockDB,
} from 'src/routes/electricity/calculator/electricitiy-calculator.types';

// simple db controller, didn't want to use orm, decided to keep it simple for test task

class DB_CONTROLLER {
  private sqlite: Database;

  constructor(db: Database) {
    this.sqlite = db;
  }

  private async addPlan(plan: IElectricityPlan) {
    return new Promise((res, rej) => {
      this.sqlite.run(DB_QUERIES.ADD_PLAN, Object.values(plan), (err) => {
        if (err) {
          rej(err.message);
        } else {
          console.log('Plan has been added.');
          res(null);
        }
      });
    });
  }

  private async checkIfPlanExists(name: string): Promise<boolean> {
    return new Promise((res, rej) => {
      this.sqlite.get(
        DB_QUERIES.CHECK_IF_EXISTS,
        name,
        (err, data: { count: number }) => {
          if (err) {
            rej(err.message);
          } else {
            if (data.count > 0) {
              return res(true);
            }
            return res(false);
          }
        },
      );
    });
  }

  async init(): Promise<boolean | string> {
    return new Promise((res, rej) => {
      this.sqlite.serialize(async () => {
        this.sqlite.run(DB_QUERIES.CREATE_TABLE);
        const data: IMockDB = JSON.parse(JSON.stringify(plans));
        data.options.forEach(async (plan) => {
          try {
            const planExists = await this.checkIfPlanExists(plan.name);
            if (!planExists) await this.addPlan(plan);
            res(true);
          } catch (err) {
            rej(err.message);
          }
        });
      });
    });
  }

  async run(command: string): Promise<IElectricityPlan[]> {
    return new Promise((res, rej) => {
      this.sqlite.all(command, (err, data: IElectricityPlan[]) => {
        if (err) {
          rej(err.message);
        } else {
          res(data);
        }
      });
    });
  }

  close() {
    this.sqlite.close();
  }
}

const DB = new DB_CONTROLLER(new Database(`${__dirname}/${DB_ENUM.path}`));

export default DB;
