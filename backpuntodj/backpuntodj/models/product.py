from django.db import models
from backpuntodj.models.category import Category


class Product(models.Model):
    category = models.ForeignKey(Category, models.DO_NOTHING)
    name = models.CharField(max_length=55)
    unit_price = models.FloatField()  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'product'
