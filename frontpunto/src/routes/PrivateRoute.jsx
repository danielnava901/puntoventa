import useUserStore from "../store/useUserStore.jsx";
import {Navigate, Outlet} from "react-router";

const PrivateRoute = ({children}) => {
    const { isAuthenticated } = useUserStore((state) => state);
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;