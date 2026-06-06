from django.urls import path
from .views import get_products, delete_product, delete_all_products

urlpatterns = [
    path('', get_products, name='products'),
    path('delete/<int:pk>/', delete_product, name='delete-product'),
    path(
    'delete-all/',
    delete_all_products,
    name='delete-all-products'
),
]