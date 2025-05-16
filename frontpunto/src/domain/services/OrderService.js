
export default class OrderService {
    constructor(oderRepository) {
        this.orderRepository = oderRepository;
    }

    isValidCustomerName = (customerName) => {
        return customerName.trim().length > 0
    }

    async createOrder(name, products) {
        if(!this.isValidCustomerName(name)) {
            throw new Error("Ingrese el nombre del comensal");
        }
        return this.orderRepository.create(name, products);
    }

    async getOrderById(orderId) {
        return this.orderRepository.getById(orderId);
    }

    async getAllOrders() {
        return this.orderRepository.getAllOrders()
    }

    async addProductToOrder(orderId, product) {
        await this.orderRepository.addProduct(orderId, product)
    }

    async closeOrder(orderId) {
        await this.orderRepository.close(orderId);
    }
}