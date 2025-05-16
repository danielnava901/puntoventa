import orderApi from "../infra/api/orderApi.js";

export default class OrderRepository {

    async create(name, products) {
        return await orderApi.create(name, products)
    }

    async addProduct(orderId, product) {
        let {quantity = 1} = product;

        return await orderApi.addProducts(orderId, quantity);
    }

    async close(orderId) {
        await orderApi.close(orderId);
    }

    async getById(orderId) {
        return await orderApi.getById(orderId);
    }

    async getAllOrders() {
        return await orderApi.getAll();
    }
}