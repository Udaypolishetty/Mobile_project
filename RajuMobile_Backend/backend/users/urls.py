from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    RegisterView,
    login_view,
    me_view,
    update_profile_view,
    logout_view,
)

urlpatterns = [
    path("register/",       RegisterView.as_view()),    # POST
    path("login/",          login_view),                 # POST
    path("me/",             me_view),                    # GET  (token required)
    path("me/update/",      update_profile_view),        # PATCH (token required)
    path("logout/",         logout_view),                # POST (token required)
    path("token/refresh/",  TokenRefreshView.as_view()), # POST
]
