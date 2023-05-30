import { render, screen } from 'test-utils';
import Marketplace from '../pages/Marketplace';
import mockServer from 'mock-server';

describe('Marketplace', () => {
    beforeAll(() => mockServer.listen());

    afterEach(() => mockServer.resetHandlers());

    afterAll(() => mockServer.close());
    it('should render Marketplace component with card items', async () => {
        render(<Marketplace />);
        const cells = await screen.findAllByRole('cell');
        expect(cells).toHaveLength(2);
    });
    it('it should match the snapshot', async () => {
        const { container } = render(<Marketplace />);
        expect(container).toMatchSnapshot();
    });
});