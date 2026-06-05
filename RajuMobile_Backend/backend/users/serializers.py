from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile


# ── Profile serializer (used inside UserSerializer) ──────────────────────────
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["phone", "address", "pincode", "city", "state"]


# ── Full user serializer (for GET /me) ───────────────────────────────────────
class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    profile = UserProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ["id", "name", "email", "profile"]

    def get_name(self, obj):
        return obj.first_name or obj.username


# ── Registration serializer ───────────────────────────────────────────────────
class RegisterSerializer(serializers.ModelSerializer):
    # Extra fields not on User model — write_only so they don't appear in output
    name    = serializers.CharField(write_only=True)
    phone   = serializers.CharField(write_only=True, required=False, allow_blank=True)
    address = serializers.CharField(write_only=True, required=False, allow_blank=True)
    pincode = serializers.CharField(write_only=True, required=False, allow_blank=True)
    city    = serializers.CharField(write_only=True, required=False, allow_blank=True)
    state   = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ["name", "email", "password", "phone", "address", "pincode", "city", "state"]

    # ── Validators ────────────────────────────────────────────────────────────
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("An account with this email already exists.")
        return value.lower().strip()

    def validate_password(self, value):
        if len(value) < 6:
            raise serializers.ValidationError("Password must be at least 6 characters.")
        return value

    # ── Create — MUST be inside the class ─────────────────────────────────────
    def create(self, validated_data):
        # Pop profile fields before creating User
        name    = validated_data.pop("name", "")
        phone   = validated_data.pop("phone", "")
        address = validated_data.pop("address", "")
        pincode = validated_data.pop("pincode", "")
        city    = validated_data.pop("city", "")
        state   = validated_data.pop("state", "")

        email = validated_data["email"]

        # Create Django User (username = email)
        user = User.objects.create_user(
            username=email,
            email=email,
            password=validated_data["password"],
            first_name=name,
        )

        # Create linked profile
        UserProfile.objects.create(
            user=user,
            phone=phone,
            address=address,
            pincode=pincode,
            city=city,
            state=state,
        )

        return user


# ── Profile update serializer (for PATCH /me) ────────────────────────────────
class UpdateProfileSerializer(serializers.Serializer):
    name    = serializers.CharField(required=False, allow_blank=True)
    phone   = serializers.CharField(required=False, allow_blank=True)
    address = serializers.CharField(required=False, allow_blank=True)
    pincode = serializers.CharField(required=False, allow_blank=True)
    city    = serializers.CharField(required=False, allow_blank=True)
    state   = serializers.CharField(required=False, allow_blank=True)
