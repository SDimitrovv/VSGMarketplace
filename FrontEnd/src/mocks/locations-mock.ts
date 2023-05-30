import { rest } from 'msw';

import locations from './locations-mock.json';

const location = [
  rest.get(`https://auto.loanvantage360.com/internship/EvaluationSystemStoyan/api/Location`, (_, res, ctx) => {
    const response = locations;

    return res(ctx.json(response));
  }),
];

export default location;