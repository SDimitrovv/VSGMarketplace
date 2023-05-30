import category from './categories-mock.ts';
import inventory from './inventory-mock.ts';
import location from './locations-mock.ts';
import marketplace from './marketplace-mock.ts';

const handlers = [
    ...marketplace,
    ...inventory,
    ...location,
    ...category,
];

export default handlers;