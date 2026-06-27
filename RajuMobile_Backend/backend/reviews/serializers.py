from rest_framework import serializers
from .models import ShopReview


class ShopReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source="user.first_name", read_only=True)

    class Meta:
        model = ShopReview
        fields = [
            "id",
            "user",
            "user_name",
            "rating",
            "review",
            "created_at",
        ]
        read_only_fields = [
            "user",
            "created_at",
        ]