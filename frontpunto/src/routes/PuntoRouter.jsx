import {Navigate, Route, Routes} from "react-router";
import Login from "../pages/Login.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Layout from "../pages/dashboard/Layout.jsx";
import VentasPage from "../pages/dashboard/VentasPage.jsx";
import {ReportPage} from "../pages/dashboard/ReportPage.jsx";
import NewOrderPage from "../pages/dashboard/NewOrderPage.jsx";
import OrderPage from "../pages/dashboard/OrderPage.jsx";
import useUserStore from "../store/useUserStore.jsx";
import {Logout} from "../pages/Logout.jsx";


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