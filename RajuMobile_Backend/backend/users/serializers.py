from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile

class RegisterSerializer(serializers.ModelSerializer):
    name = serializers.CharField(write_only=True)
    address = serializers.CharField(write_only=True)
    pincode = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['name', 'email', 'password', 'address','pincode']

    def validate_email(self, value):

        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "Email already exists"
            )

        return value

def create(self, validated_data):

    name = validated_data.pop("name")
    address = validated_data.pop("address")
    pincode = validated_data.pop("pincode")

    email = validated_data["email"]

    user = User.objects.create_user(
        username=email,
        email=email,
        password=validated_data["password"],
        first_name=name
    )

    UserProfile.objects.create(
        user=user,
        address=address,
        pincode=pincode
    )

    return user