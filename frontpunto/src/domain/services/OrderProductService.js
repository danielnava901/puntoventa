import {sender} from "../../utils/sender.js";

export default class OrderProductService {

    constructor(orderProductRepository) {
        this.orderProductRepository = orderProductRepository;
    }

    async orderProduct(desde, hasta, token) {
        return await this.orderProductRepository.getOrderProducts(desde, hasta, token);
    }
}