import { useCompleteOrderMutation } from '../../services/ordersService';
import { Dispatch } from 'react';
import { IOrder } from '../../types/types';
import { toast } from 'react-toastify';
import { Fade } from '@mui/material';

type PendingOrderProps = {
    order: IOrder;
    setOrders: Dispatch<React.SetStateAction<IOrder[]>>;
}

const PendingOrderComponent = ({ order, setOrders }: PendingOrderProps) => {
    const [completeOrder] = useCompleteOrderMutation();

    const onComplete = async () => {
        const response = await completeOrder(order.id);
        if ('data' in response) {
            setOrders(oldOrders => oldOrders.filter(o => o.id !== order.id));
            toast.success('Order completed!');
        }
    }

    return (
        <Fade in={true} timeout={1000}>
            <div className='order' role='cell'>
                <div className='firstThree'>
                    <span className='codeColumn'>{order.productCode}</span>
                    <span className='qtyColumn'>{order.quantity}</span>
                    <span className='priceColumn'>{order.price} BGN</span>
                </div>
                <span className='orderedByColumn'>{order.email}</span>
                <span className='orderDateColumn'>{order.date}</span>
                <button className='actionColumn completeButton' onClick={onComplete}>Complete</button>
            </div >
        </Fade>
    );
};

export default PendingOrderComponent;