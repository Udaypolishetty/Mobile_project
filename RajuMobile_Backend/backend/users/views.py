from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from .models import UserProfile
from .serializers import (
    RegisterSerializer,
    UserSerializer,
    UpdateProfileSerializer,
)


# ── POST /api/auth/register/ ──────────────────────────────────────────────────
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            # Return the first readable error message
            errors = serializer.errors
            first_msg = next(iter(errors.values()))[0]
            return Response({"error": str(first_msg)}, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.save()

        # Return tokens immediately so frontend can log in right after register
        refresh = RefreshToken.for_user(user)
        return Response({
            "message": "Account created successfully.",
            "access": str(refresh.access_token),
            "refresh": str(refresh),
"user": {
    "id": user.id,
    "name": user.first_name or user.username,
    "email": user.email,

    "is_staff": user.is_staff,

    "phone": profile.phone or "",
    "address": profile.address or "",
    "pincode": profile.pincode or "",
    "city": profile.city or "",
    "state": profile.state or "",
}
        }, status=status.HTTP_201_CREATED)


# ── POST /api/auth/login/ ─────────────────────────────────────────────────────
@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    email    = request.data.get("email", "").lower().strip()
    password = request.data.get("password", "")

    if not email or not password:
        return Response({"error": "Email and password are required."}, status=400)

    # Django stores username as email
    user = authenticate(username=email, password=password)

    if user is None:
        return Response({"error": "Invalid email or password."}, status=400)

    if not user.is_active:
        return Response({"error": "This account has been disabled."}, status=403)

    refresh = RefreshToken.for_user(user)

    # Try to get profile; create blank one if missing
    profile, _ = UserProfile.objects.get_or_create(user=user)

    return Response({
        "access":  str(refresh.access_token),
        "refresh": str(refresh),
        "user": {
            "id":      user.id,
            "name":    user.first_name or user.username,
            "email":   user.email,
            "is_staff": user.is_staff,
            "phone":   profile.phone   or "",
            "address": profile.address or "",
            "pincode": profile.pincode or "",
            "city":    profile.city    or "",
            "state":   profile.state   or "",
        }
    })


# ── GET /api/auth/me/  ────────────────────────────────────────────────────────
# Returns full profile for the logged-in user (needs Authorization: Bearer <token>)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me_view(request):
    user = request.user
    profile, _ = UserProfile.objects.get_or_create(user=user)

    return Response({
        "id":      user.id,
        "name":    user.first_name or user.username,
        "email":   user.email,
        "is_staff": user.is_staff,
        "phone":   profile.phone   or "",
        "address": profile.address or "",
        "pincode": profile.pincode or "",
        "city":    profile.city    or "",
        "state":   profile.state   or "",
        "member_since": user.date_joined.strftime("%d %b %Y"),
    })


# ── PATCH /api/auth/me/update/ ───────────────────────────────────────────────
# Lets the user update name / address / phone etc.
@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_profile_view(request):
    serializer = UpdateProfileSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=400)

    data = serializer.validated_data
    user = request.user

    # Update User model fields
    if "name" in data and data["name"]:
        user.first_name = data["name"]
        user.save(update_fields=["first_name"])

    # Update profile fields
    profile, _ = UserProfile.objects.get_or_create(user=user)
    for field in ["phone", "address", "pincode", "city", "state"]:
        if field in data:
            setattr(profile, field, data[field])
    profile.save()

    return Response({
        "message": "Profile updated successfully.",
        "user": {
            "id":      user.id,
            "name":    user.first_name,
            "email":   user.email,
            "phone":   profile.phone   or "",
            "address": profile.address or "",
            "pincode": profile.pincode or "",
            "city":    profile.city    or "",
            "state":   profile.state   or "",
        }
    })


# ── POST /api/auth/logout/ ────────────────────────────────────────────────────
# Blacklists the refresh token
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout_view(request):
    try:
        refresh_token = request.data.get("refresh")
        if refresh_token:
            token = RefreshToken(refresh_token)
            token.blacklist()
        return Response({"message": "Logged out successfully."})
    except Exception:
        # Even if blacklist fails, tell frontend it's done
        return Response({"message": "Logged out."})
