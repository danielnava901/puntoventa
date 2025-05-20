export type OrderModel = {
  id?: number,
  order_name: string,
  user_id: number,
  total: number,
  status: string,
  created_at?: Date,
  closed_at?: Date
}
