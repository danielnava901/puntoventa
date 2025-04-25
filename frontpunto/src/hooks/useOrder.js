import {useEffect, useState} from "react";
import {sender} from "../utils/sender.js";
import useUserStore from "../store/useUserStore.jsx";

const useOrder = (orderId, trigger) => {
    const {token} = useUserStore(state => state);
    const [order, setOrder] = useState(null);
    const getData = async () => {
        const response = await sender({
            url: `http://localhost:8000/api/order/${orderId}`,
            token,
            method: "GET"
        });
        const {data} = response;
        setOrder(data);
    }

    useEffect(() => {
        getData();
    }, [orderId, trigger]);

    return {order}
}

export default useOrder;