import {OrderRepository} from '../../repositories/order-repository';
import {OrderModel} from '../../models/order-model';

export class OrderService {
  constructor(private orderRepository: OrderRepository) {
  }

  async getAllOrders () : Promise<OrderModel[]> {

    return await this.orderRepository.gerOrders();
  }
}
