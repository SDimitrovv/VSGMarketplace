import mockServer from 'mock-server';
import InventoryTable from '../pages/Inventory/InventoryTable';
import { render, screen } from 'test-utils';
import products from '../mocks/products-mock.json';

describe('InventoryTable', () => {
  beforeAll(() => mockServer.listen());

  afterEach(() => mockServer.resetHandlers());

  afterAll(() => mockServer.close());
  it('should render row components', async () => {
    render(<InventoryTable isLoading={false} filteredProducts={products} setProducts={() => console.log('setProducts')} />);
    const rows = await screen.findAllByRole('row');
    expect(rows).toHaveLength(3);
  });
  it('should match the snapshot', async () => {
    const { container } = render(<InventoryTable isLoading={true} filteredProducts={products} setProducts={() => console.log('setProducts')} />);
    expect(container).toMatchSnapshot();
  });
});