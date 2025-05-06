from backpuntodj.models.order import Order
from backpuntodj.models.user import User
from datetime import datetime
from backpuntodj.repositories.order_repository import OrderRepository
from backpuntodj.models.product import Product
from backpuntodj.models.order_product import OrderProduct
from django.db import transaction
from django.utils import timezone


class OrderService:
    @staticmethod
    def create_order(user, order_name, products=None):
        if products is None:
            products = []

        print({
            "products": products,
            "order_name": order_name
        })

        with transaction.atomic():
            new_order = Order.objects.create(
                user=user,
                order_name=order_name,
                total=0.0,
                status="OPEN",
                created_at=timezone.now()
            )

            total_price = 0.0

            for product_data in products:
                try:
                    product = Product.objects.get(id=product_data["id"])
                except Product.DoesNotExist:
                    continue

                quantity = int(product_data.get("quantity", 1))
                unit_price = float(product_data.get("unit_price", 0.0))
                price = quantity * unit_price

                OrderProduct.objects.create(
                    order_id=new_order,
                    product=product,
                    price=price,
                    created_at=timezone.now(),
                    quantity=quantity
                )

                total_price += price

            new_order.total = total_price
            new_order.save()

            return new_order

    @staticmethod
    def add_order_product(order_id, product_id, quantity):
        try:
            print(":::::ORDER_ID:::::")
            print({
                "order_id": order_id,
                "product_id": product_id,
                "quantity": quantity
            })
            order = Order.objects.get(id=order_id)
            product = Product.objects.get(id=product_id)
        except (Order.DoesNotExist, Product.DoesNotExist):
            return None

        print({"order_total": order.total})
        order_total = float(order.total)

        try:
            order_product = OrderProduct.objects.get(order_id=order, product=product)
            prev_quantity = float(order_product.quantity)
            prev_price = float(order_product.price)

            print("YA EXISTE EN LA CUENTA")
            print({
                "prev_quantity": prev_quantity,
                "prev_price": prev_price
            })

            new_quantity = int(prev_quantity) + int(quantity)
            new_price = prev_price + float(product.unit_price) * int(quantity)
            print({
                "new_quantity": new_quantity,
                "new_price": new_price
            })
            order_product.quantity = new_quantity
            order_product.price = new_price
        except OrderProduct.DoesNotExist:
            print("NUEVO PRODUCTO A LA ORDEN")
            order_product = OrderProduct(
                order_id=order,
                product=product,
                price=float(product.unit_price) * float(quantity),
                created_at=datetime.now(),
                quantity=quantity
            )

        order.total = order_total + float(product.unit_price) * float(quantity)

        with transaction.atomic():
            order.save()
            order_product.save()

        return order_product
