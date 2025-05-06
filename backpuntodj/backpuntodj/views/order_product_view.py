from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from backpuntodj.services.order_product_service import OrderProductService


class OrderProductView(ViewSet):

    def list(self, request):
        desde = request.query_params.get("desde")
        hasta = request.query_params.get("hasta")

        if desde is None or hasta is None:
            return Response({
                "data": False,
                "errors": ["Fields Not found"]
            }, status=status.HTTP_400_BAD_REQUEST)

        desde = int(desde)
        hasta = int(hasta)
        products = OrderProductService.get_products_by_date(desde, hasta)

        return Response({
            "data": products,
            "errors": []
        }, status=status.HTTP_200_OK)
