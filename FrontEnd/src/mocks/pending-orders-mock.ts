import { rest } from 'msw';

import orders from './orders-mock.json';

const pendingOrders = [
  rest.get(`https://auto.loanvantage360.com/internship/EvaluationSystemStoyan/api/Order/Pending-Orders`, (_, res, ctx) => {
    return res(ctx.json(orders));
  }),
];

export default pendingOrders;