from rest_framework.routers import DefaultRouter
from backpuntodj.views.auth_view import AuthView

router = DefaultRouter()
router.register(r'', AuthView, basename='auth')

urlpatterns = router.urls