import {useEffect, useState} from "react";
import {sender} from "../utils/sender.js";
import useUserStore from "../store/useUserStore.jsx";
import OrderRepository from "../domain/repositories/OrderRepository.js";
import OrderService from "../domain/services/OrderService.js";


const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository);

const useOrder = (orderId, trigger) => {
    const {token} = useUserStore(state => state);
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [totalUnitProducts, setTotalUnitProducts] = useState(0);

    const getOrderData = async () => {
        try {
            setLoading(true);
            const orderData = await orderService.getOrderById(orderId, token);
            if(!!orderData) setOrder(orderData);
            let newTotal = orderData.products.reduce((prev, currentValue) => {
                return prev + Number(currentValue.quantity)
            }, 0);
            setTotalUnitProducts(newTotal);
        }catch (e) {
            throw new Error("Error de comunicaciones [useOrder]")
        }finally {
            setLoading(true);
        }

    }

    useEffect(() => {
        getOrderData();
    }, [orderId, trigger]);


    return {order, totalUnitProducts, loading}
}

export default useOrder;