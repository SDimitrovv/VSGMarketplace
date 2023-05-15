import { useState, useRef } from "react";
import { completeOrder } from "../services/itemsService";
import { IOrder } from "../types/types";

type PendingOrderProps = {
    order: IOrder;
}

const PendingOrderComponent = ({ order }: PendingOrderProps) => {
    const orderRef = useRef<HTMLDivElement>(null);
    const [opacity, setOpacity] = useState(0);
    setTimeout(() => {
        setOpacity(1);
    }, 500);

    const onComplete = async () => {
        const res = await completeOrder(order.id);
        console.log(res);
        setOpacity(0);
        setTimeout(() => {
            orderRef.current?.remove();
        }, 500);
    }

    return (
        <div ref={orderRef} className="order" style={{ opacity }} id={`${order.id}`} >
            <div className="firstThree">
                <span className="codeColumn">{order.code}</span>
                <span className="qtyColumn">{order.quantity}</span>
                <span className="priceColumn">{order.price} BGN</span>
            </div>
            <span className="orderedByColumn">{order.email}</span>
            <span className="orderDateColumn">{order.date}</span>
            <button className="actionColumn completeButton" onClick={onComplete}>Complete</button>
        </div >
    );
};

export default PendingOrderComponent;