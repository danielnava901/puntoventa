from backpuntodj.models.order import Order
from backpuntodj.models.user import User
from datetime import datetime
from backpuntodj.repositories.order_repository import OrderRepository
from backpuntodj.models.product import Product
from backpuntodj.models.order_product import OrderProduct
from django.db import transaction


class OrderService:
    @staticmethod
    def create_order(user, order_name, products=None):
        if products is None:
            products = []

        with transaction.atomic():
            new_order = Order.objects.create(
                user=user,
                order_name=order_name,
                total=0.0,
                status="OPEN",
                created_at=datetime.now()
            )

            total_price = 0.0

            for product_data in products:
                try:
                    product = Product.objects.get(id=product_data["id"])
                except Product.DoesNotExist:
                    continue

                quantity = product_data.get("quantity", 1)
                unit_price = product_data.get("unit_price", 0.0)
                price = quantity * unit_price

                OrderProduct.objects.create(
                    order_id=new_order,
                    product=product,
                    price=price,
                    created_at=datetime.now()
                )

                total_price += price

            new_order.total = total_price
            new_order.save()

            return new_order

    @staticmethod
    def add_order_product(order_id, product_id, quantity):
        try:
            order = Order.objects.get(id=order_id)
            product = Product.objects.get(id=product_id)
        except (Order.DoesNotExist, Product.DoesNotExist):
            return None

        order_total = float(order.total)

        try:
            order_product = OrderProduct.objects.get(order_id=order, product=product)
            prev_quantity = order_product.quantity
            prev_price = float(order_product.price)

            order_product.quantity = float(prev_quantity) + float(quantity)
            order_product.price = prev_price + float(product.unit_price * quantity)
        except OrderProduct.DoesNotExist:
            order_product = OrderProduct(
                order_id=order,
                product=product,
                price=product.unit_price * quantity,
                created_at=datetime.now(),
                quantity=quantity
            )

        order.total = order_total + float(product.unit_price * quantity)

        with transaction.atomic():
            order.save()
            order_product.save()

        return order_product
