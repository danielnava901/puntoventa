from rest_framework.routers import DefaultRouter
from backpuntodj.views.order_product_view import OrderProductView

router = DefaultRouter()
router.register(r'orderProduct', OrderProductView, basename='orderProduct')

urlpatterns = router.urls