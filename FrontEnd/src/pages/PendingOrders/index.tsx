import { useGetPendingOrdersQuery } from '../../services/ordersService.ts';
import { IOrder } from "../../types/types.ts";
import PendingOrderComponent from "../../components/PendingOrderComponent.tsx";

const PendingOrders = () => {
    const { data: orders } = useGetPendingOrdersQuery("/Order/PendingOrders");

    return (
        <main id='pendingOrdersMain'>
            <div id="headingSection">
                <span className="codeColumn">Code</span>
                <span className="qtyColumn">QTY</span>
                <span className="priceColumn">Price</span>
                <span className="orderedByColumn">Ordered By</span>
                <span className="orderDateColumn">Order Date</span>
                <span className="actionColumn">Action</span>
            </div>
            {orders
                ? orders.map((order: IOrder) => <PendingOrderComponent order={order} key={order.id} />)
                : <div className="order" >No orders</div>}
        </main>
    );
};

export default PendingOrders;
