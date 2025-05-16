import orderApi from "../infra/api/orderApi.js";

export default class OrderRepository {

    async create(name, products, token) {
        return await orderApi.create(name, products, token)
    }

    async addProduct(orderId, product, token) {
        let {quantity = 1} = product;

        return await orderApi.addProducts(orderId, quantity, token);
    }

    async close(orderId, token) {
        await orderApi.close(orderId, token);
    }

    async getById(orderId, token) {
        return await orderApi.getById(orderId, token);
    }

    async getAllOrders(token) {
        return await orderApi.getAll(token);
    }
}