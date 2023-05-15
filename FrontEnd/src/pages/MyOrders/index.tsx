import { useEffect, useState } from "react";
import { loadMyOrders } from "../../services/itemsService.ts";
import { IOrder } from "../../types/types.ts";
import MyOrderComponent from "../../components/MyOrderComponent.tsx";

const MyOrders = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [opacity, setOpacity] = useState(0);
    setTimeout(() => {
        setOpacity(1);
    }, 300);

    const user = JSON.parse(sessionStorage.getItem("user") as string);
    const email = user.email;

    useEffect(() => {
        loadMyOrders(email).then(result => {
            setOrders(result);
        });
    }, []);

    return (
        <main id='myOrdersMain'>
            <div id="headingSection" style={{ opacity }}>
                <span className="nameColumn">Name</span>
                <span className="qtyColumn">QTY</span>
                <span className="priceColumn">Price</span>
                <span className="orderDateColumn">Order Date</span>
                <span className="orderStatus">Status</span>
            </div>
            {orders.length > 0
                ? orders.map((order: IOrder) => <MyOrderComponent order={order} key={order.id} />)
                : <div className="order" style={{ opacity }}>No orders</div>}
        </main>
    );
};

export default MyOrders;
