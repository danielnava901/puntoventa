import {useEffect, useState} from "react";
import OrderProductService from "../domain/services/OrderProductService.js";
import OrderProductRepository from "../domain/repositories/OrderProductRepository.js";

const orderProductRepository = new OrderProductRepository();
const orderProductService = new OrderProductService(orderProductRepository);

const useOrderProducts = (desde, hasta) => {
    const [products, setProducts] = useState([]);

    const getData = async () => {
        try {
            const orderProducts = await orderProductService.orderProduct(desde, hasta);
            if(!!orderProducts) setProducts(orderProducts);
        }catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getData();
    }, [desde, hasta]);

    return {products}
}

export default useOrderProducts;