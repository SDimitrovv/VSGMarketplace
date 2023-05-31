import { render, screen } from 'test-utils';
import mockServer from 'mock-server';
import PendingOrders from '../pages/PendingOrders';

describe('PendingOrders', () => {
    beforeAll(() => mockServer.listen());

    afterEach(() => mockServer.resetHandlers());

    afterAll(() => mockServer.close());
    it('should render with orders', async () => {
        render(<PendingOrders />);
        const orders = await screen.findAllByRole('cell');
        expect(orders).toHaveLength(2);
    });
    it('should match the snapshot', async () => {
        const { container } = render(<PendingOrders />);
        expect(container).toMatchSnapshot();
    });
});