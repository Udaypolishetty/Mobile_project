from rest_framework import generics, permissions
from .models import ShopReview
from .serializers import ShopReviewSerializer


class ShopReviewListCreateView(generics.ListCreateAPIView):
    serializer_class = ShopReviewSerializer

    def get_queryset(self):
        return ShopReview.objects.select_related("user")

    def get_permissions(self):
        if self.request.method == "POST":
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)