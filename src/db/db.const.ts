export enum DB_ENUM {
  path = 'veri-db',
}

export enum DB_QUERIES {
  CREATE_TABLE = `CREATE TABLE IF NOT EXISTS plans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type INTEGER,
    includedKwh INTEGER,
    baseCost INTEGER,
    additionalKwhCost INTEGER
  )
`,
  ADD_PLAN = `INSERT INTO plans (name, type, includedKwh, baseCost, additionalKwhCost) VALUES (?, ?, ?, ?, ?)`,
  GET_PLANS = 'SELECT * FROM plans',
  CHECK_IF_EXISTS = 'SELECT COUNT(*) AS count FROM plans WHERE name = ?',
}

// mock

export const plans = Object.freeze({
  options: [
    {
      name: 'Product A',
      type: 1,
      includedKwh: null,
      baseCost: 5,
      additionalKwhCost: 22,
    },
    {
      name: 'Product B',
      type: 2,
      includedKwh: 4000,
      baseCost: 800,
      additionalKwhCost: 25,
    },
    {
      name: 'Product C',
      type: 3,
      includedKwh: 8000,
      baseCost: 1600,
      additionalKwhCost: 27,
    },
  ],
});
