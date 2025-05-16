import {sender} from "../../../utils/sender.js";


const orderApi = {
    create: async (name, products) => {
        return await sender({
            url: "http://localhost:8000/api/order/",
            data: {
                order_name: name,
                products
            }
        });
    },
    addProducts: async (orderId, quantity) => {
        return await sender({
            url: `http://localhost:8000/api/order/${orderId}/products?quantity=${quantity}`,
            data: {productId: id}
        });
    },
    close: async (orderId) => {
        await sender({
            url: `http://localhost:8000/api/order/${orderId}`,
            method: "PATCH"
        });
    },
    getById: async(orderId) => {
        return await sender({
            url: `http://localhost:8000/api/order/${orderId}`,
            method: "GET"
        });
    },
    getAll: async () => {
        return await sender({
            url: `http://localhost:8000/api/order/`,
            method: "GET"
        });
    }
}




export default orderApi