import { useRejectOrderMutation } from '../../services/ordersService.ts';
import { useState } from 'react';
import { IOrder } from '../../types/types.ts';
import { toast } from 'react-toastify';
import { Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Popup from '../../components/Popup.tsx';

type MyOrderProps = {
    order: IOrder;
}

const MyOrderComponent = ({ order }: MyOrderProps) => {
    const [rejectOrder] = useRejectOrderMutation();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [currentStatus, setCurrentStatus] = useState(order.status);

    const popupMessage = `Are you sure you want to reject this order ?`;

    const onCancel = async () => {
        const response = await rejectOrder(order.id);
        setAnchorEl(null);
        if ('error' in response) {
            return;
        }

        setTimeout(() => {
            setCurrentStatus('Declined');
        }, 600);

        toast.info('Order declined.');
    }

    return (
        <>
            <Popup popupMessage={popupMessage} onYes={onCancel} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
            <Fade in={true} timeout={1000}>
                <div id={order.id.toString()} className='order' role='cell'>
                    <span className='nameColumn'>{order.productFullName}</span>
                    <div className='firstTwo'>
                        <span className='qtyColumn'>{order.quantity}</span>
                        <span className='priceColumn'>{order.price} BGN</span>
                    </div>
                    <span className='orderDateColumn'>{order.date}</span>
                    <div className='orderStatus'>
                        <span>{currentStatus}</span>
                        {currentStatus === 'Pending' &&
                            <a className='cancelOrder' onClick={e => setAnchorEl(e.currentTarget)}>
                                <CloseIcon />
                            </a>}
                    </div>
                </div>
            </Fade>
        </>
    );
};

export default MyOrderComponent;