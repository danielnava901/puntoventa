import {Navigate, Route, Routes} from "react-router";
import Login from "./pages/Login.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import App from "./App.jsx";
import Layout from "./pages/dashboard/Layout.jsx";
import VentasPage from "./pages/dashboard/ventas/VentasPage.jsx";
import {ReportPage} from "./pages/dashboard/report/ReportPage";
import NewOrderPage from "./pages/dashboard/neworder/NewOrderPage.jsx";
import OrderPage from "./pages/dashboard/order/OrderPage.jsx";


const PuntoRouter = () => {

    return <Routes>
        <Route path="/" element={<Navigate to="/punto" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/punto" element={<PrivateRoute />}>
            <Route path="" element={<Layout />} >
                <Route index element={<VentasPage />} />
                <Route path="reportes" element={<ReportPage />} />
                <Route path="nueva-orden" element={<NewOrderPage />} />
                <Route path="orden/:orderId" element={<OrderPage />} />
            </Route>
        </Route>
    </Routes>
}

export default PuntoRouter;