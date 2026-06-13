from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response

from .models import Product, ProductImage
from .serializers import ProductSerializer


# ── GET /api/products/  ────────────────────────────────────────────
@api_view(['GET'])
@permission_classes([AllowAny])
def get_products(request):
    qs = Product.objects.prefetch_related("images").all()

    # Optional filters from query params
    category = request.query_params.get("category")
    if category:
        qs = qs.filter(category__iexact=category)

    search = request.query_params.get("search")
    if search:
        qs = qs.filter(name__icontains=search)

    sale = request.query_params.get("sale")
    if sale:
        qs = qs.exclude(badge="").exclude(badge__isnull=True)

    serializer = ProductSerializer(qs, many=True)
    return Response(serializer.data)


# ── DELETE /api/products/delete/<pk>/  ────────────────────────────
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_product(request, pk):
    try:
        product = Product.objects.get(id=pk)
        product.delete()
        return Response({"message": "Product deleted successfully"})
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)


# ── DELETE /api/products/delete-all/  ─────────────────────────────
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_all_products(request):
    count = Product.objects.count()
    Product.objects.all().delete()
    return Response({"message": f"{count} products deleted successfully"})


# ── POST /api/products/add/  ───────────────────────────────────────
@api_view(['POST'])
@permission_classes([IsAdminUser])
@parser_classes([MultiPartParser, FormParser])      # ← needed for file upload
def add_product(request):
    try:
        print(f"🔵 ADD_PRODUCT: Received data: {request.data}")
        serializer = ProductSerializer(data=request.data)

        if serializer.is_valid():
            product = serializer.save()
            print(f"✅ Product created: {product.id} - {product.name}")

            # Upload each image — CloudinaryField handles the actual upload automatically
            images = request.FILES.getlist("images")
            print(f"📸 Processing {len(images)} images")
            for img in images:
                ProductImage.objects.create(product=product, image=img)
                print(f"   ✓ Image uploaded for product {product.id}")

            # Return the full product with Cloudinary image URLs
            result = ProductSerializer(
                Product.objects.prefetch_related("images").get(id=product.id)
            ).data
            print(f"✅ Returning product: {result}")
            return Response(result, status=201)
        
        print(f"❌ Serializer errors: {serializer.errors}")
        return Response({"error": str(serializer.errors)}, status=400)
    except Exception as e:
        print(f"🔴 ADD_PRODUCT ERROR: {str(e)}")
        import traceback
        traceback.print_exc()
        return Response({"error": str(e)}, status=500)


# ── PUT /api/products/update/<pk>/  ───────────────────────────────
@api_view(['PUT'])
@permission_classes([IsAdminUser])
@parser_classes([MultiPartParser, FormParser, JSONParser])
def update_product(request, pk):
    try:
        print(f"🔵 UPDATE_PRODUCT: ID={pk}, Data: {request.data}")
        product = Product.objects.get(id=pk)
        print(f"   Found product: {product.name}")
    except Product.DoesNotExist:
        print(f"❌ Product not found: {pk}")
        return Response({"error": "Product not found"}, status=404)

    try:
        serializer = ProductSerializer(product, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            print(f"✅ Product updated: {product.id}")

            # If new images were uploaded, replace them
            images = request.FILES.getlist("images")
            if images:
                print(f"📸 Replacing images: {len(images)} new images")
                product.images.all().delete()
                for img in images:
                    ProductImage.objects.create(product=product, image=img)
                print(f"   ✓ Images replaced")
            else:
                print(f"   ℹ No new images provided")

            result = ProductSerializer(
                Product.objects.prefetch_related("images").get(id=product.id)
            ).data
            print(f"✅ Returning updated product: {result}")
            return Response(result)

        print(f"❌ Serializer errors: {serializer.errors}")
        return Response({"error": str(serializer.errors)}, status=400)
    except Exception as e:
        print(f"🔴 UPDATE_PRODUCT ERROR: {str(e)}")
        import traceback
        traceback.print_exc()
        return Response({"error": str(e)}, status=500)


# ── POST /api/products/validate-stock/  ───────────────────────────
@api_view(['POST'])
@permission_classes([AllowAny])
def validate_stock(request):
    items = request.data.get('items', [])
    errors = []

    for item in items:
        try:
            product = Product.objects.get(id=item['id'])
            if product.stock <= 0:
                errors.append({
                    "id":      item['id'],
                    "name":    item['name'],
                    "issue":   "out_of_stock",
                    "message": f"{item['name']} is now out of stock.",
                })
            elif product.stock < item['qty']:
                errors.append({
                    "id":        item['id'],
                    "name":      item['name'],
                    "issue":     "insufficient_stock",
                    "available": product.stock,
                    "message":   f"Only {product.stock} unit(s) of {item['name']} available.",
                })
        except Product.DoesNotExist:
            errors.append({
                "id":      item['id'],
                "name":    item['name'],
                "issue":   "not_found",
                "message": f"{item['name']} is no longer available.",
            })

    return Response({"valid": len(errors) == 0, "errors": errors})
