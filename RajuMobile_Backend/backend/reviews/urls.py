from django.urls import path
from .views import ShopReviewListCreateView

urlpatterns = [
    path("", ShopReviewListCreateView.as_view(), name="shop-reviews"),
]