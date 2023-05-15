import { useEffect, useState } from "react";
import { loadPendingOrders } from "../../services/itemsService.ts";
import { IOrder } from "../../types/types.ts";
import PendingOrderComponent from "../../components/PendingOrderComponent.tsx";

const PendingOrders = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [opacity, setOpacity] = useState(0);
    setTimeout(() => {
        setOpacity(1);
    }, 300);

    useEffect(() => {
        loadPendingOrders().then(result => {
            setOrders(result);
        });
    }, []);

    return (
        <main id='pendingOrdersMain'>
            <div id="headingSection" style={{ opacity }}>
                <span className="codeColumn">Code</span>
                <span className="qtyColumn">QTY</span>
                <span className="priceColumn">Price</span>
                <span className="orderedByColumn">Ordered By</span>
                <span className="orderDateColumn">Order Date</span>
                <span className="actionColumn">Action</span>
            </div>
            {orders.length > 0
                ? orders.map((order: IOrder) => <PendingOrderComponent order={order} key={order.id} />)
                : <div className="order" style={{ opacity }}>No orders</div>}
        </main>
    );
};

export default PendingOrders;
