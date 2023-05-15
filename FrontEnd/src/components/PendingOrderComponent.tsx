import { useRef } from "react";
import { completeOrder } from "../services/itemsService";
import { IOrder } from "../types/types";
import { Fade } from '@mui/material';

type PendingOrderProps = {
    order: IOrder;
}

const PendingOrderComponent = ({ order }: PendingOrderProps) => {
    const orderRef = useRef<HTMLDivElement>(null);

    const onComplete = async () => {
        const res = await completeOrder(order.id);
        console.log(res);
        setTimeout(() => {
            orderRef.current?.remove();
        }, 500);
    }

    return (
        <Fade in={true} timeout={500}>
            <div ref={orderRef} className="order" id={`${order.id}`} >
                <div className="firstThree">
                    <span className="codeColumn">{order.code}</span>
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