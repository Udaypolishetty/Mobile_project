from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.auth.models import User

from products.models import Product
from products.serializers import ProductSerializer

from orders.models import Order
# Add this import at the top of admin views.py
from orders.serializers import OrderSerializer

from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser


@api_view(["GET"])
def dashboard_stats(request):

    return Response({
        "products": Product.objects.count(),
        "customers": User.objects.count(),
        "orders": Order.objects.count(),
        "pending_orders": Order.objects.filter(
            status="pending"
        ).count()
    })


@api_view(["GET"])
def admin_products(request):

    products = Product.objects.all().order_by("-id")

    serializer = ProductSerializer(
        products,
        many=True,
        context={"request": request}
    )

    return Response(serializer.data)


@api_view(["GET"])
def admin_customers(request):

    users = User.objects.all()

    data = []

    for user in users:
        data.append({
            "id": user.id,
            "name": user.first_name,
            "email": user.email,
            "joined": user.date_joined,
        })

    return Response(data)



@api_view(["GET"])
def admin_orders(request):

    orders = Order.objects.all().order_by("-created_at")

    serializer = OrderSerializer(
        orders,
        many=True
    )

    return Response(serializer.data)


@api_view(["POST"])
def create_product(request):

    serializer = ProductSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["DELETE"])
def delete_product(request, pk):

    try:
        product = Product.objects.get(id=pk)
    except Product.DoesNotExist:
        return Response(status=404)

    product.delete()

    return Response({
        "message": "Deleted"
    })



@api_view(["PUT"])
def update_product(request, pk):

    try:
        product = Product.objects.get(id=pk)
    except Product.DoesNotExist:
        return Response(status=404)

    serializer = ProductSerializer(
        product,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=400)