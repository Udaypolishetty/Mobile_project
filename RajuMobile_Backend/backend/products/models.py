from django.db import models


class Product(models.Model):
    CATEGORY_CHOICES = [
    ("mobiles", "Mobiles"),
    ("chargers", "Chargers"),
    ("cases", "Cases & Covers"),
    ("earphones", "Earphones"),
    ("smartwatches", "Smart Watches"),
    ("powerbanks", "Power Banks"),
    ("accessories", "Accessories"),
]

    name = models.CharField(max_length=200)

    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES
    )

    brand = models.CharField(max_length=100)

    description = models.TextField()

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    original_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True
    )

    stock = models.PositiveIntegerField(default=0)

    rating = models.FloatField(default=4.5)

    reviews = models.IntegerField(default=0)

    badge = models.CharField(max_length=50, blank=True)

    image = models.URLField()

    is_featured = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name