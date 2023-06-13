import { rest } from 'msw';

import products from './products-mock.json';

// const product = { code: '1', fullName: '1', categoryId: 1, locationId: 1, quantity: 1 }
const inventory = [
  rest.get(`https://auto.loanvantage360.com/internship/EvaluationSystemStoyan/api/Product/Inventory`, (_, res, ctx) => {
    return res(ctx.json(products));
  }),

  rest.post(`https://auto.loanvantage360.com/internship/EvaluationSystemStoyan/api/Product`, (req, res, ctx) => {
    const product = { id: '1', ...req.params };
    return res(ctx.json({ data: product }));
  }),
];

export default inventory;