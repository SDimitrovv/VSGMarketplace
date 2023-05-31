import { render, screen } from 'test-utils';
import Marketplace from '../pages/Marketplace';
import mockServer from 'mock-server';

describe('Marketplace', () => {
    beforeAll(() => mockServer.listen());

    afterEach(() => mockServer.resetHandlers());

    afterAll(() => mockServer.close());
    it('should render with card items', async () => {
        render(<Marketplace />);
        const productCards = await screen.findAllByRole('cell');
        expect(productCards).toHaveLength(2);
    });
    it('should match the snapshot', async () => {
        const { container } = render(<Marketplace />);
        expect(container).toMatchSnapshot();
    });
});