import { rest } from 'msw';

import categories from './categories-mock.json';

const category = [
  rest.get(`https://auto.loanvantage360.com/internship/EvaluationSystemStoyan/api/Category`, (_, res, ctx) => {
    const response = categories;

    return res(ctx.json(response));
  }),
];

export default category;