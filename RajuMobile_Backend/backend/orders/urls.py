from django.urls import path
from .views import *

urlpatterns = [
    path("create/", create_order),

    path("my-orders/", my_orders),

    path("all/", all_orders),

    path(
        "<int:pk>/status/",
        update_order_status
    ),
    path("<int:pk>/", get_order),
]