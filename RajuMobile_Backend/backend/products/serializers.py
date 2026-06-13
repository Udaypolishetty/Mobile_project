from rest_framework import serializers
from .models import Product, ProductImage


class ProductImageSerializer(serializers.ModelSerializer):
    # ── KEY FIX ────────────────────────────────────────────────────
    # CloudinaryField is NOT a plain string — it's a CloudinaryResource object.
    # We use SerializerMethodField to call .url on it and get the full
    # https://res.cloudinary.com/... link that everyone can load.
    image = serializers.SerializerMethodField()

    class Meta:
        model  = ProductImage
        fields = ["id", "image"]

    def get_image(self, obj):
        if obj.image:
            return obj.image.url        # ← returns full Cloudinary https URL
        return None


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model  = Product
        fields = "__all__"
