from django.contrib import admin
from .models import ShopReview


@admin.register(ShopReview)
class ShopReviewAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "rating",
        "created_at",
    )

    list_filter = (
        "rating",
        "created_at",
    )

    search_fields = (
        "user__username",
        "review",
    )