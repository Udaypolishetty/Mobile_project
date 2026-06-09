from django.urls import path
from .views import *

urlpatterns = [
    path("dashboard/", dashboard_stats),
    path("products/", admin_products),
    path("customers/", admin_customers),
    path("orders/", admin_orders),
    path("products/create/", create_product),

path(
    "products/<int:pk>/delete/",
    delete_product
),

path(
    "products/<int:pk>/update/",
    update_product
),
]