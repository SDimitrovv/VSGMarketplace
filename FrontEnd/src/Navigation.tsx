import { Home, Marketplace, Inventory, PendingOrders, MyOrders, MyItems, NotFound, LentItems } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminRoute from './components/AdminRoute';
import UserRoute from './components/UserRoute';
import Layout from './components/Layout';

const Navigation = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path='*' element={<NotFound />} />
                <Route element={<Layout ><UserRoute /></Layout>}>
                    <Route path='marketplace' element={<Marketplace />} />
                    <Route path='my-orders' element={<MyOrders />} />
                    <Route path='my-items' element={<MyItems />} />
                    <Route element={<AdminRoute />} >
                        <Route path='inventory' element={<Inventory />} />
                        <Route path='pending-orders' element={<PendingOrders />} />
                        <Route path='lent-items' element={<LentItems />} />
                    </Route >
                </Route>
            </Routes>
        </BrowserRouter >
    )
}

export default Navigation;