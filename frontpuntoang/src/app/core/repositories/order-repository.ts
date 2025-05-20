import {OrderModel} from '../models/order-model';

export interface OrderRepository {
  gerOrders: () => Promise<OrderModel[]>
  getOrderById: () => Promise<OrderModel>
  createOrder: (order: OrderModel) => Promise<OrderModel>
  updateOrder: (order: OrderModel) => Promise<void>
}
