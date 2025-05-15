import {useEffect, useState} from "react";
import {sender} from "../utils/sender.js";
import useUserStore from "../store/useUserStore.jsx";

const useOrder = (orderId, trigger) => {
    const {token} = useUserStore(state => state);
    const [order, setOrder] = useState(null);
    const [totalUnitProducts, setTotalUnitProducts] = useState(0);

    const getData = async () => {
        const orderData = await sender({
            url: `http://localhost:8000/api/order/${orderId}`,
            token,
            method: "GET"
        });

        if(!!orderData) setOrder(orderData);

        let newTotal = orderData.products.reduce((prev, currentValue) => {
            return prev + Number(currentValue.quantity)
        }, 0);

        setTotalUnitProducts(newTotal);
    }

    useEffect(() => {
        getData();
    }, [orderId, trigger]);


    return {order, totalUnitProducts}
}

export default useOrder;