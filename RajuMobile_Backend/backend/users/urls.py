from django.urls import path
from .views import RegisterView
from .views import login_view
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', login_view),
    path('refresh/', TokenRefreshView.as_view()),
]