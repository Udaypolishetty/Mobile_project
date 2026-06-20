from rest_framework import serializers
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(
        source="product.name",
        read_only=True
    )

    product_image = serializers.SerializerMethodField()

    def get_product_image(self, obj):
        request = self.context.get("request")
        # Try product.images (related images model) first
        first_img = obj.product.images.first() if hasattr(obj.product, "images") else None
        if first_img and hasattr(first_img, "image") and first_img.image:
            return request.build_absolute_uri(first_img.image.url) if request else first_img.image.url
        # Fall back to product.image (single image field)
        if obj.product.image:
            return request.build_absolute_uri(obj.product.image.url) if request else obj.product.image.url
        return None

    class Meta:
        model = OrderItem
        fields = [
            "id",
            "product",
            "product_name",
            "product_image",
            "quantity",
            "price",
        ]


class OrderSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()

    def get_items(self, obj):
        return OrderItemSerializer(
            obj.items.all(),
            many=True,
            context=self.context
        ).data

    class Meta:
        model = Order
        fields = "__all__"