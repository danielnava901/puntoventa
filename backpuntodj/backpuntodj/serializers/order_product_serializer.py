from rest_framework import serializers
from backpuntodj.models.order_product import OrderProduct


class OrderProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderProduct
        fields = '__all__'
