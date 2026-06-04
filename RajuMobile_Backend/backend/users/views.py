from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import RegisterSerializer
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

@api_view(['POST'])
def login_view(request):

    email = request.data.get("email")
    password = request.data.get("password")

    user = authenticate(
        username=email,  # username stored as email
        password=password
    )

    if user is None:
        return Response(
            {"error": "Invalid email or password"},
            status=400
        )

    refresh = RefreshToken.for_user(user)

    return Response({
        "access": str(refresh.access_token),
        "refresh": str(refresh),
        "user": {
            "name": user.first_name,
            "email": user.email
        }
    })