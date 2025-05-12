import {useEffect, useState} from "react";
import {sender} from "../utils/sender.js";
import useUserStore from "../store/useUserStore.jsx";

const useOrders = () => {
    const {token} = useUserStore(state => state);
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([])
    const getData = async () => {
        setLoading(true)
        const response = await sender({
            url: "http://localhost:8000/api/order/",
            method: "GET",
            token
        });
        setLoading(false)
        if(!!response) setOrders(response);
    }

    useEffect(() => {
        getData()
    }, [token])

    return {orders, loading};
}

export default useOrders