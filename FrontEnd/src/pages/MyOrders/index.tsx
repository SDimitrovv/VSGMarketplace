import { useGetMyOrdersQuery } from "../../services/ordersService.ts";
import { IOrder } from "../../types/types.ts";
import MyOrderComponent from "../../components/MyOrderComponent.tsx";

const MyOrders = () => {
    const user = JSON.parse(sessionStorage.getItem("user") as string);
    const email = user.email;
    const { data: orders } = useGetMyOrdersQuery(email);

    return (
        <main id='myOrdersMain'>
            <div id="headingSection" >
                <span className="nameColumn">Name</span>
                <span className="qtyColumn">QTY</span>
                <span className="priceColumn">Price</span>
                <span className="orderDateColumn">Order Date</span>
                <span className="orderStatus">Status</span>
            </div>
            {orders
                ? orders.map((order: IOrder) => <MyOrderComponent order={order} key={order.id} />)
                : <div className="order" >No orders</div>}
        </main>
    );
};

export default MyOrders;
