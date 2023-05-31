import { render, screen } from 'test-utils';
import mockServer from 'mock-server';
import MyOrders from '../pages/MyOrders';

describe('MyOrders', () => {
    beforeAll(() => mockServer.listen());

    afterEach(() => mockServer.resetHandlers());

    afterAll(() => mockServer.close());
    it('should render with orders', async () => {
        render(<MyOrders />);
        const orders = await screen.findAllByRole('cell');
        expect(orders).toHaveLength(2);
    });
    it('should match the snapshot', async () => {
        const { container } = render(<MyOrders />);
        expect(container).toMatchSnapshot();
    });
});