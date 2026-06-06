from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product
from .serializers import ProductSerializer


@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
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
def delete_all_products(request):

    count = Product.objects.count()

    Product.objects.all().delete()

    return Response({
        "message": f"{count} products deleted successfully"
    })