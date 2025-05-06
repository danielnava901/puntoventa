from django.db import models
from backpuntodj.models.order import Order
from backpuntodj.models.product import Product


class OrderProduct(models.Model):
    order_id = models.ForeignKey(Order, models.DO_NOTHING)
    product = models.ForeignKey(Product, models.DO_NOTHING)
    quantity = models.IntegerField()
    price = models.FloatField()
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'order_product'
