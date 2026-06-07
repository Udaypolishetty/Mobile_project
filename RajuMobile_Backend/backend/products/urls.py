from django.urls import path
from .views import get_products, delete_product, delete_all_products, add_product,update_product, validate_stock

urlpatterns = [
    path('', get_products, name='products'),
     path('add/', add_product, name='add-product'),
     path('update/<int:pk>/', update_product, name='update-product'),
    path('delete/<int:pk>/', delete_product, name='delete-product'),
    path('delete-all/',delete_all_products,name='delete-all-products'),
    path('validate-stock/', validate_stock, name='validate-stock'),
]