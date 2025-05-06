from rest_framework.routers import DefaultRouter
from backpuntodj.views.order_view import OrderView

router = DefaultRouter()
router.register(r'order', OrderView, basename='order')

urlpatterns = router.urls