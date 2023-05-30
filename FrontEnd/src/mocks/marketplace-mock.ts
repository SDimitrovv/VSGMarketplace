import { rest } from 'msw';

import products from './products-mock.json';

const marketplace = [
  rest.get(`https://auto.loanvantage360.com/internship/EvaluationSystemStoyan/api/Product/Marketplace`, (_, res, ctx) => {
    return res(ctx.json(products));
  }),
];

export default marketplace;