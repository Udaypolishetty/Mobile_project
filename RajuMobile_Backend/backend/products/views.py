from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product,ProductImage
from .serializers import ProductSerializer

from rest_framework.permissions import (
    AllowAny,
    IsAdminUser
)
from rest_framework.decorators import (
    api_view,
    permission_classes
)


@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_product(request, pk):
    try:
        product = Product.objects.get(id=pk)
        product.delete()

        return Response({
            "message": "Product deleted successfully"
        })

    except Product.DoesNotExist:
        return Response({
            "error": "Product not found"
        }, status=404)
    
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_all_products(request):

    count = Product.objects.count()

    Product.objects.all().delete()

    return Response({
        "message": f"{count} products deleted successfully"
    })
@api_view(['POST'])
@permission_classes([IsAdminUser])
def add_product(request):

    serializer = ProductSerializer(data=request.data)

    if serializer.is_valid():

        product = serializer.save()

        images = request.FILES.getlist("images")

        for img in images:
            ProductImage.objects.create(
                product=product,
                image=img
            )

        return Response({
            "message": "Product added successfully"
        })

    return Response(serializer.errors, status=400)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_product(request, pk):

    try:
        product = Product.objects.get(id=pk)

    except Product.DoesNotExist:
        return Response(
            {"error": "Product not found"},
            status=404
        )

    serializer = ProductSerializer(
        product,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():

        serializer.save()

        images = request.FILES.getlist("images")

        for img in images:
            ProductImage.objects.create(
                product=product,
                image=img
            )

        return Response({
            "message": "Updated successfully"
        })

    return Response(serializer.errors, status=400)


@api_view(['POST'])
def validate_stock(request):
    items = request.data.get('items', [])  # [{ id, qty, name }, ...]
    errors = []

    for item in items:
        try:
            product = Product.objects.get(id=item['id'])
            if product.stock <= 0:
                errors.append({
                    "id": item['id'],
                    "name": item['name'],
                    "issue": "out_of_stock",
                    "message": f"{item['name']} is now out of stock."
                })
            elif product.stock < item['qty']:
                errors.append({
                    "id": item['id'],
                    "name": item['name'],
                    "issue": "insufficient_stock",
                    "available": product.stock,
                    "message": f"Only {product.stock} unit(s) of {item['name']} available."
                })
        except Product.DoesNotExist:
            errors.append({
                "id": item['id'],
                "name": item['name'],
                "issue": "not_found",
                "message": f"{item['name']} is no longer available."
            })

    return Response({
        "valid": len(errors) == 0,
        "errors": errors
    })