import {useEffect, useState} from "react";
import useUserStore from "../store/useUserStore.jsx";
import OrderRepository from "../domain/repositories/OrderRepository.js";
import OrderService from "../domain/services/OrderService.js";


const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository);

const useOrders = () => {
    const {token} = useUserStore(state => state);
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([])

    const getOrdersData = async () => {
        try {
            setLoading(true)
            const orders = await orderService.getAllOrders(token);
            if(!!orders) setOrders(orders);
        }catch (e) {
            throw new Error("Error de comunicaciones [getOrders]")
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(!!token) getOrdersData()
    }, [token])

    return {orders, loading};
}

export default useOrders