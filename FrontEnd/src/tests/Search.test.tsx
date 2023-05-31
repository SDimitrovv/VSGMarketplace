import Inventory from '../pages/Inventory';
import userEvent from '@testing-library/user-event';
import mockServer from 'mock-server';
import { render, screen } from 'test-utils';

describe('Inventory', () => {
    beforeAll(() => mockServer.listen());

    afterEach(() => mockServer.resetHandlers());

    afterAll(() => mockServer.close());
    it('should search and find 4 rows', async () => {
        render(<Inventory />);
        const user = userEvent.setup();
        const search = screen.getByLabelText('Search...');

        await user.type(search, 'HP');

        const rows = await screen.findAllByRole('row');
        expect(rows).toHaveLength(4);
        expect(rows).toMatchSnapshot();
    });
});