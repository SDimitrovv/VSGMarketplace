import { useEffect, useState } from 'react';
import { useGetPendingOrdersQuery } from '../../services/ordersService.ts';
import { IOrder } from '../../types/types.ts';
import PendingOrderComponent from './PendingOrderComponent.tsx';

const PendingOrders = () => {
    const { data, isLoading } = useGetPendingOrdersQuery();
    const [orders, setOrders] = useState<IOrder[]>([]);

    useEffect(() => {
        data && setOrders(data);
    }, [data]);

    return (
        <main id='pendingOrdersMain'>
            <div id='headingSection'>
                <span className='codeColumn'>Code</span>
                <span className='qtyColumn'>QTY</span>
                <span className='priceColumn'>Price</span>
                <span className='orderedByColumn'>Ordered By</span>
                <span className='orderDateColumn'>Order Date</span>
                <span className='actionColumn'>Action</span>
            </div>
            {orders?.length !== 0 && (
                orders?.map((order: IOrder) => (
                    <PendingOrderComponent order={order} setOrders={setOrders} key={order.id} />
                ))
            )}
            {(orders?.length === 0 || !orders) && !isLoading && <div className='order'>No Orders</div>}
            {isLoading && <div className='order'>Loading...</div>}
        </main>
    );
};

export default PendingOrders;
