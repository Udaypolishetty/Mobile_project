from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=255)
    brand = models.CharField(max_length=100)
    category = models.CharField(max_length=100)

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

    badge = models.CharField(
        max_length=50,
        blank=True,
        default=""
    )

    description = models.TextField()

    rating = models.DecimalField(
        max_digits=2,
        decimal_places=1,
        default=0
    )


    reviews = models.PositiveIntegerField(default=0)

    stock = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="images"
    )

    image = models.ImageField(upload_to="products/")

    def __str__(self):
        return f"{self.product.name} Image"