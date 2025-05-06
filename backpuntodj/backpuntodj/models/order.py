from django.db import models
from backpuntodj.models.user import User


class Order(models.Model):
    user = models.ForeignKey(User, models.DO_NOTHING)
    order_name = models.CharField(max_length=55)
    total = models.FloatField()
    status = models.CharField(max_length=15)
    created_at = models.DateTimeField()
    closed_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'order'
