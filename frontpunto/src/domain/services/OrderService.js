import {sender} from "../../utils/sender.js";

export default class OrderService {
    constructor(oderRepository) {
        this.orderRepository = oderRepository;
    }

    isValidCustomerName = (customerName) => {
        return customerName.trim().length > 0
    }

    async createOrder(name, products, token) {
        if(!this.isValidCustomerName(name)) {
            throw new Error("Ingrese el nombre del comensal");
        }
        return this.orderRepository.create(name, products, token);
    }

    async getOrderById(orderId, token) {
        return this.orderRepository.getById(orderId, token);
    }

    async getAllOrders(token) {
        return this.orderRepository.getAllOrders(token)
    }

    async addProductToOrder(orderId, product, token) {
        await this.orderRepository.addProduct(orderId, product, token)
    }

    async closeOrder(orderId) {
        await this.orderRepository.close(orderId);
    }
}