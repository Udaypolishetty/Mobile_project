# from django.shortcuts import render
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import viewsets

# from .models import Order, OrderItem
# from products.models import Product
# from .serializers import OrderSerializer


# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def create_order(request):
#     data = request.data

#     order = Order.objects.create(
#         user=request.user,
#         customer_name=data["customer_name"],
#         phone=data["phone"],
#         address=data["address"],
#         city=data["city"],
#         state=data["state"],
#         pincode=data["pincode"],
#         total_amount=data["total_amount"]
#     )

#     for item in data["items"]:
#         product = Product.objects.get(id=item["product_id"])

#         OrderItem.objects.create(
#             order=order,
#             product=product,
#             quantity=item["quantity"],
#             price=product.price
#         )

#         product.stock -= item["quantity"]
#         product.save()

#     serializer = OrderSerializer(order)
#     return Response(serializer.data, status=201)


# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def my_orders(request):
#     orders = Order.objects.filter(user=request.user).order_by("-created_at")
#     serializer = OrderSerializer(orders, many=True)
#     return Response(serializer.data)


# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def all_orders(request):
#     orders = Order.objects.all().order_by("-created_at")
#     serializer = OrderSerializer(orders, many=True)
#     return Response(serializer.data)


# @api_view(["PATCH"])
# @permission_classes([IsAuthenticated])
# def update_order_status(request, pk):
#     order = Order.objects.get(id=pk)
#     order.status = request.data["status"]
#     order.save()

#     return Response({
#         "message": "Status updated"
#     })


# class OrderViewSet(viewsets.ModelViewSet):
#     queryset = Order.objects.all().order_by("-created_at")
#     serializer_class = OrderSerializer


# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def get_order(request, pk):
#     order = Order.objects.get(id=pk)
#     serializer = OrderSerializer(order)
#     return Response(serializer.data)

# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def get_order(request, pk):
#     order = Order.objects.get(id=pk)

#     serializer = OrderSerializer(order)

#     return Response(serializer.data)


from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, viewsets

from .models import Order, OrderItem
from products.models import Product
from .serializers import OrderSerializer


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_order(request):
    data = request.data

    order = Order.objects.create(
        user=request.user,
        customer_name=data["customer_name"],
        phone=data["phone"],
        address=data["address"],
        city=data["city"],
        state=data["state"],
        pincode=data["pincode"],
        total_amount=data["total_amount"],
    )

    for item in data["items"]:
        product = get_object_or_404(Product, id=item["product_id"])

        OrderItem.objects.create(
            order=order,
            product=product,
            quantity=item["quantity"],
            price=product.price,
        )

        product.stock -= item["quantity"]
        product.save()

    return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_orders(request):
    orders = Order.objects.filter(user=request.user).order_by("-created_at")
    return Response(OrderSerializer(orders, many=True).data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def all_orders(request):
    if not request.user.is_staff:
        return Response({"error": "Not authorized"}, status=status.HTTP_403_FORBIDDEN)

    orders = Order.objects.all().order_by("-created_at")
    return Response(OrderSerializer(orders, many=True).data)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_order_status(request, pk):
    if not request.user.is_staff:
        return Response({"error": "Not authorized"}, status=status.HTTP_403_FORBIDDEN)

    order = get_object_or_404(Order, id=pk)
    order.status = request.data.get("status", order.status)
    order.save()

    return Response({"message": "Status updated"})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_order(request, pk):
    order = get_object_or_404(Order, id=pk)
    return Response(OrderSerializer(order).data)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by("-created_at")
    serializer_class = OrderSerializer