from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from backpuntodj.models.order import Order
from backpuntodj.models.order_product import OrderProduct
from backpuntodj.serializers.order_serializer import OrderSerializer
from backpuntodj.serializers.order_product_serializer import OrderProductSerializer
from backpuntodj.serializers.product_serializer import ProductSerializer
from backpuntodj.services.order_service import OrderService


class OrderView(ViewSet):
    def list(self, request):
        user = request.user
        orders = Order.objects.filter(user=user)
        serializer = OrderSerializer(orders, many=True)

        return Response({
            "data": serializer.data,
            "errors": []
        })

    def create(self, request):
        order_name = request.data.get("order_name")
        products = request.data.get("products", [])
        user = request.user

        if order_name is False:
            return Response({
                "data": False,
                "errors": ["No hay datos"]
            }, status=status.HTTP_400_BAD_REQUEST)

        new_order = OrderService.create_order(user, order_name, products)

        serializer = OrderSerializer(new_order)

        return Response({
            "data": serializer.data,
            "errors": []
        }, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        try:
            order = Order.objects.get(pk=pk)
        except Order.DoesNotExist:
            return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = OrderSerializer(order)
        products = OrderProduct.objects.filter(order_id=order)
        # products = [op.product for op in products]

        combined_products = []
        for op in products:
            combined_products.append({
                **ProductSerializer(op.product).data,
                "subtotal": op.price,
                "quantity": op.quantity,
                "created_at": op.created_at
            })

        data = serializer.data
        data["products"] = combined_products

        return Response({
            "data": data,
            "errors1": []
        })

    def partial_update(self, request, pk=None):
        try:
            order = Order.objects.get(pk=pk)
        except Order.DoesNotExist:
            return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)

        order.status = "CLOSED"
        order.save()
        serializer = OrderSerializer(order)

        return Response({
            "data": {
                "order": serializer.data,
                "status": "CLOSED",
            },
            "errors": []
        })

    @action(detail=True, methods=["post"], url_path="products/(?P<product_id>[^/.]+)")
    def products(self, request, pk=None, product_id=None):
        quantity = request.query_params.get("quantity", 1)

        order_product = OrderService.add_order_product(pk, product_id, quantity)

        if not order_product:
            return Response({
                "errors": ["Order or product not found"]
            }, status=status.HTTP_404_NOT_FOUND)

        # serializer = OrderProductSerializer(order_product, many=True)

        return Response({
            "data": {
                "product_id": product_id,
                "order_id": pk,
                # 'order_product': serializer.data
            },
            "errors": []
        })
