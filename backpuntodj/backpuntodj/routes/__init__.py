from .auth_urls import router as auth_router
from .order_urls import router as order_router
from django.urls import path, include

# urlpatterns = auth_router.urls
urlpatterns = [
    path("api/", include(auth_router.urls)),
    path("api/", include(order_router.urls)),
]