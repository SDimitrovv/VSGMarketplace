import { Home, Marketplace, Inventory, PendingOrders, MyOrders, NotFound } from './pages';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { lazy } from "react";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// const Home = lazy(() => import('./pages/Home'));
// const Marketplace = lazy(() => import('./pages/Marketplace'));
// const Inventory = lazy(() => import('./pages/Inventory'));
// const PendingOrders = lazy(() => import('./pages/PendingOrders'));
// const MyOrders = lazy(() => import('./pages/MyOrders'));
// const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="marketplace" element={<Layout><Marketplace /></Layout>} />
          <Route path="inventory" element={<Layout><Inventory /></Layout>} />
          <Route path="pending-orders" element={<Layout><PendingOrders /></Layout>} />
          <Route path="my-orders" element={<Layout><MyOrders /></Layout>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
