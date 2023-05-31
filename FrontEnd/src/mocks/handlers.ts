import category from './categories-mock.ts';
import inventory from './inventory-mock.ts';
import location from './locations-mock.ts';
import marketplace from './marketplace-mock.ts';
import myOrders from './my-orders-mock.ts';
import pendingOrders from './pending-orders-mock.ts';

const handlers = [
    ...marketplace,
    ...inventory,
    ...location,
    ...category,
    ...pendingOrders,
    ...myOrders,
];

export default handlers;