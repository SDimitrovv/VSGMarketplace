// import { Home, Marketplace, Inventory, PendingOrders, MyOrders, NotFound } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import Layout from './components/Layout';
import UserRoute from './components/UserRoute';
import AdminRoute from './components/AdminRoute';

const Home = lazy(() => import('./pages/Home'));
const Marketplace = lazy(() => import('./pages/Marketplace'));
const Inventory = lazy(() => import('./pages/Inventory'));
const PendingOrders = lazy(() => import('./pages/PendingOrders'));
const MyOrders = lazy(() => import('./pages/MyOrders'));
const NotFound = lazy(() => import('./pages/NotFound'));

const Navigation = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path='*' element={<NotFound />} />
                <Route element={<UserRoute />}>
                    <Route path='marketplace' element={<Layout ><Marketplace /></Layout>} />
                    <Route path='my-orders' element={<Layout ><MyOrders /></Layout>} />
                    <Route element={<Layout ><AdminRoute /></Layout>} >
                        <Route path='inventory' element={<Inventory />} />
                        <Route path='pending-orders' element={<PendingOrders />} />
                    </Route >
                </Route>
            </Routes>
        </BrowserRouter >
    )
}

export default Navigation;