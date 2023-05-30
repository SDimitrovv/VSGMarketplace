import Inventory from '../pages/Inventory';
import userEvent from '@testing-library/user-event';
import mockServer from 'mock-server';
import { render, screen } from 'test-utils';

describe('AddProductModal', () => {
  beforeAll(() => mockServer.listen());

  afterEach(() => mockServer.resetHandlers());

  afterAll(() => mockServer.close());
  it('should render AddProductModal component', async () => {
    render(<Inventory />);
    const user = userEvent.setup();
    const addBtn = screen.getByText('Add new');
    await user.click(addBtn);

    const addModal = await screen.findByRole('dialog');
    expect(addModal).toBeInTheDocument();
    expect(addModal).toMatchSnapshot();
  });
});