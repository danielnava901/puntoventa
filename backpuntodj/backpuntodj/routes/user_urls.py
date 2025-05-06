"""
from rest_framework.routers import DefaultRouter
from backpuntodj.views.auth_view import UserViewSet

router = DefaultRouter()
router.register(r'user', UserViewSet, basename='user')

urlpatterns = router.routes
"""