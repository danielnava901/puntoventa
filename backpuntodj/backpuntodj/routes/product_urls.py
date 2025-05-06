from rest_framework.routers import DefaultRouter
from backpuntodj.views.product_view import ProductView

router = DefaultRouter()
router.register(r'product', ProductView, basename='product')

urlpatterns = router.urls