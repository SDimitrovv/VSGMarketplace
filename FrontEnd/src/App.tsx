import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./components/Layout";

const Home = lazy(() => import('./pages/Home'));
const Marketplace = lazy(() => import('./pages/Marketplace'));
const Inventory = lazy(() => import('./pages/Inventory'));
const PendingOrders = lazy(() => import('./pages/PendingOrders'));
const MyOrders = lazy(() => import('./pages/MyOrders'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="marketplace" element={<Layout><Marketplace /></Layout>} />
          <Route path="inventory" element={<Layout><Inventory /></Layout>} />
          <Route path="pending-orders" element={<Layout><PendingOrders /></Layout>} />
          <Route path="my-orders" element={<Layout><MyOrders /></Layout>} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </Suspense>
    </BrowserRouter >
  );
}

export default App;
