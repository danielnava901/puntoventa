import {sender} from "../../../utils/sender.js";


const orderApi = {
    create: async (name, products, token) => {
        return await sender({
            url: "http://localhost:8000/api/order/",
            data: {
                order_name: name,
                products
            },
            token
        });
    },
    addProducts: async (orderId, quantity, token) => {
        return await sender({
            url: `http://localhost:8000/api/order/${orderId}/products?quantity=${quantity}`,
            token,
            data: {productId: id}
        });
    },
    close: async (orderId, token) => {
        await sender({
            url: `http://localhost:8000/api/order/${orderId}`,
            method: "PATCH",
            token
        });
    },
    getById: async(orderId, token) => {
        return await sender({
            url: `http://localhost:8000/api/order/${orderId}`,
            token,
            method: "GET"
        });
    },
    getAll: async (token) => {
        return await sender({
            url: `http://localhost:8000/api/order/`,
            token,
            method: "GET"
        });
    }
}




export default orderApi