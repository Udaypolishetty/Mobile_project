from django.db import models
from django.contrib.auth.models import User


class ShopReview(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="shop_reviews"
    )

    rating = models.PositiveSmallIntegerField()

    review = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user.username} - {self.rating}★"