import useUserStore from "../store/useUserStore.jsx";
import {useNavigate} from "react-router";
import {useEffect} from "react";

export const Logout = () => {
    const logout = useUserStore(state => state.logout);
    const navigate = useNavigate();

    useEffect(() => {
        logout();
        navigate("/login");
    }, [logout, navigate]);

    return null;
}