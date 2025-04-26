import {Navigate, Route, Routes} from "react-router";
import Login from "./pages/Login.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Layout from "./pages/dashboard/Layout.jsx";
import VentasPage from "./pages/dashboard/ventas/VentasPage.jsx";
import {ReportPage} from "./pages/dashboard/report/ReportPage";
import NewOrderPage from "./pages/dashboard/neworder/NewOrderPage.jsx";
import OrderPage from "./pages/dashboard/order/OrderPage.jsx";
import useUserStore from "./store/useUserStore.jsx";
import {Logout} from "./pages/Logout.jsx";


const PuntoRouter = () => {
    const { isAuthenticated } = useUserStore((state) => state);

    return <Routes>
        <Route path="/" element={<Navigate to="/punto" />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/punto" /> : <Login />} />
        <Route path="/punto" element={<PrivateRoute />}>
            <Route path="" element={<Layout />} >
                <Route index element={<VentasPage />} />
                <Route path="reportes" element={<ReportPage />} />
                <Route path="nueva-orden" element={<NewOrderPage />} />
                <Route path="orden/:orderId" element={<OrderPage />} />
            </Route>
        </Route>
        <Route path="/logout" element={<Logout />} />

    </Routes>
}

export default PuntoRouter;