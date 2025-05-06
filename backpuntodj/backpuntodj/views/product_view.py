from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from backpuntodj.models.order import Order
from backpuntodj.models.product import Product
from backpuntodj.models.order_product import OrderProduct
from backpuntodj.serializers.order_serializer import OrderSerializer
from backpuntodj.serializers.order_product_serializer import OrderProductSerializer
from backpuntodj.serializers.product_serializer import ProductSerializer
from backpuntodj.services.order_service import OrderService
from backpuntodj.services.product_service import ProductService


class ProductView(ViewSet):

    def list(self, request):
        search = request.data.get("search", "")
        products = Product.objects.filter(name__icontains=search)
        serializer = ProductSerializer(products, many=True)

        return Response({
            "data": serializer.data,
            "errors": []
        })

    def create(self, request):
        name = request.data.get("name")
        price = request.data.get("price")

        if not name or not price:
            return Response({
                "data": False,
                "errors": ["No hay datos"]
            }, status=status.HTTP_400_BAD_REQUEST)

        print("::::::PRICE:::::")
        print(price)
        print(name)
        new_product = ProductService.create_product(name, price)
        serializer = ProductSerializer(new_product)

        return Response({
            "data": serializer.data,
            "errors": []
        }, status=status.HTTP_201_CREATED)
