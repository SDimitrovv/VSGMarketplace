import { setupServer } from 'msw/node';

import handlers from './handlers';

const mockServer = setupServer(...handlers);

export default mockServer;