import userEvent from '@testing-library/user-event';
import CardComponent from '../pages/Marketplace/CardComponent';
import { render, screen } from 'test-utils';
import { IProduct } from 'types/types';

const product: IProduct = { id: 1, code: '123', fullName: 'Product', quantity: 11, categoryId: 1, locationId: 1, type: 'Laptop', city: 'Plovdiv' }
describe('Popup', () => {
    it('should render Popup component', async () => {
        render(<CardComponent product={product} />);
        const user = userEvent.setup();
        const buyBtn = screen.getByRole('button');
        await user.click(buyBtn);

        const popup = screen.getByRole('tooltip');
        expect(popup).toBeInTheDocument();
        expect(popup).toMatchSnapshot();
    });
});