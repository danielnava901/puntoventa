import {sender} from "../../utils/sender.js";

export default class OrderRepository {

    async create(name, products, token) {
        return await sender({
            url: "http://localhost:8000/api/order/",
            data: {
                order_name: name,
                products
            },
            token
        });
    }

    async addProduct(orderId, product, token) {
        let {id, quantity = 1} = product;

        return await sender({
            url: `http://localhost:8000/api/order/${orderId}/products?quantity=${quantity}`,
            token,
            data: {productId: id}
        });
    }

    async close(orderId, token) {
        await sender({
            url: `http://localhost:8000/api/order/${orderId}`,
            method: "PATCH",
            token
        });
    }
}