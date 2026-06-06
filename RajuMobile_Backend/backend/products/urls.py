from django.urls import path
from .views import get_products, delete_product, delete_all_products, add_product,update_product

urlpatterns = [
    path('', get_products, name='products'),
     path('add/', add_product, name='add-product'),
     path('update/<int:pk>/', update_product, name='update-product'),
    path('delete/<int:pk>/', delete_product, name='delete-product'),
    path('delete-all/',delete_all_products,name='delete-all-products'),
]