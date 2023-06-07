import { useRejectOrderMutation } from '../../services/ordersService.ts';
import { useState, Dispatch } from 'react';
import { IOrder } from '../../types/types.ts';
import { toast } from 'react-toastify';
import { Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Popup from '../../components/Popup.tsx';

type MyOrderProps = {
    order: IOrder;
    setOrders: Dispatch<React.SetStateAction<IOrder[]>>;
}

const MyOrderComponent = ({ order, setOrders }: MyOrderProps) => {
    const [rejectOrder] = useRejectOrderMutation();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const onCancel = async () => {
        setAnchorEl(null);
        const response = await rejectOrder(order.id);
        if ('data' in response) {
            toast.info('Order declined.');
            setOrders(oldOrders => oldOrders.map(o => o.id === order.id ? { ...o, status: 'Declined' } : o));
        }
    }

    const PopupMessage: () => JSX.Element = () => {
        return (
            <p>
                Are you sure you want to reject this order?
            </p>
        )
    };

    return (
        <>
            <Popup PopupMessage={PopupMessage} onYes={onCancel} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
            <Fade in={true} timeout={1000}>
                <div className='order' role='cell'>
                    <span className='nameColumn'>{order.productFullName}</span>
                    <div className='firstTwo'>
                        <span className='qtyColumn'>{order.quantity}</span>
                        <span className='priceColumn'>{order.price} BGN</span>
                    </div>
                    <span className='orderDateColumn'>{order.date}</span>
                    <div className='orderStatus'>
                        <span>{order.status}</span>
                        <a className='cancelOrder' onClick={e => setAnchorEl(e.currentTarget)}>
                            {order.status === 'Pending' &&
                                <CloseIcon />
                            }
                        </a>
                    </div>
                </div>
            </Fade>
        </>
    );
};

export default MyOrderComponent;