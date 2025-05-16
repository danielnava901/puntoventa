import orderProductApi from "../infra/api/orderProductApi.js";

export default class OrderProductRepository {

    async getOrderProducts(desde, hasta) {
        return await orderProductApi.fetchGetOrderProducts(desde, hasta);
    }

}