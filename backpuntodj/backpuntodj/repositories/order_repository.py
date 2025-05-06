from datetime import datetime
from backpuntodj.models.order import Order


class OrderRepository:

    @staticmethod
    def create_simple_order(user, name):
        print(user)
        print(name)

        return Order.objects.create(
            user=user,
            order_name=name,
            total=0.0,
            status="OPEN",
            created_at=datetime.now()
        )
