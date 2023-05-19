import { useCompleteOrderMutation } from "../services/ordersService";
import { IOrder } from "../types/types";
import { Fade } from '@mui/material';
import { useRef } from "react";
import { toast } from "react-toastify";

type PendingOrderProps = {
    order: IOrder;
}

const PendingOrderComponent = ({ order }: PendingOrderProps) => {
    const [completeOrder] = useCompleteOrderMutation();
    const orderRef = useRef<HTMLDivElement>(null);

    const onComplete = async () => {
        const response = await completeOrder(order.id);
        if (!('error' in response)) {
            orderRef.current?.remove();
            toast.success('Order completed!');
        }
    }

    return (
        <Fade in={true} timeout={1000}>
            <div ref={orderRef} className="order" id={order.id.toString()} >
                <div className="firstThree">
                    <span className="codeColumn">{order.productCode}</span>
                    <span className="qtyColumn">{order.quantity}</span>
                    <span className="priceColumn">{order.price} BGN</span>
                </div>
                <span className="orderedByColumn">{order.email}</span>
                <span className="orderDateColumn">{order.date}</span>
                <button className="actionColumn completeButton" onClick={onComplete}>Complete</button>
            </div >
        </Fade>
    );
};

export default PendingOrderComponent;