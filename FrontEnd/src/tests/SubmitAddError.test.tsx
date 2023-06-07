import { render, screen } from 'test-utils';
import AddProductModal from '../pages/Inventory/AddProductModal';
import mockServer from 'mock-server';
import userEvent from '@testing-library/user-event';

describe('AddProductModal', () => {
    beforeAll(() => mockServer.listen());

    afterEach(() => mockServer.resetHandlers());

    afterAll(() => mockServer.close());
    it('renders the modal and on submit shows errors', async () => {
        render(<AddProductModal products={[]} setProducts={() => console.log('')} showAddModal={true} setShowAddModal={() => console.log('')} />);

        const user = userEvent.setup();
        await user.type(screen.getByLabelText('Code *'), 'ABC123');
        await user.type(screen.getByLabelText('Name *'), 'Product Name');
        await user.type(screen.getByLabelText('Qty *'), '10');

        //await user.click(await screen.findByText('Category *'));
        //await user.click(await screen.findByText('Laptop'));
        //await user.click(await screen.findByText('Location *'));
        //await user.click(await screen.findByText('Plovdiv'));

        await user.click(screen.getByText('Add'));

        // await screen.findByText('Created successfully!');
        // expect(screen.queryByText('Add New Item')).not.toBeInTheDocument();
        // expect(screen.getByLabelText('Code *')).toHaveValue('');
        // expect(screen.getByLabelText('Name *')).toHaveValue('');
        // expect(screen.getByLabelText('Qty *')).toHaveValue('');

        const addModal = await screen.findByRole('dialog');

        const categoryErrorText = await screen.findByText('Category field is required');
        const locationErrorText = await screen.findByText('Location field is required');

        expect(addModal).toMatchSnapshot();
        expect(addModal).toBeInTheDocument();
        expect(categoryErrorText).toBeInTheDocument();
        expect(locationErrorText).toBeInTheDocument();
    });
});