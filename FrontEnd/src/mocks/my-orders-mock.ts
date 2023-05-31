import { rest } from 'msw';

import orders from './orders-mock.json';

const myOrders = [
  rest.get(`https://auto.loanvantage360.com/internship/EvaluationSystemStoyan/api/Order/My-Orders`, (_, res, ctx) => {
    return res(ctx.json(orders));
  }),
];

export default myOrders;