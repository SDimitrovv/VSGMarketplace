import { rest } from 'msw';

import products from './products-mock.json';

const inventory = [
  rest.get(`https://auto.loanvantage360.com/internship/EvaluationSystemStoyan/api/Product/Inventory`, (_, res, ctx) => {
    return res(ctx.json(products));
  }),
];

export default inventory;