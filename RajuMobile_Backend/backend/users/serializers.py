from rest_framework import serializers
from django.contrib.auth.models import User

class RegisterSerializer(serializers.ModelSerializer):
    name = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['name', 'email', 'password']

    def validate_email(self, value):

        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "Email already exists"
            )

        return value

    def create(self, validated_data):

        name = validated_data.pop("name")
        email = validated_data["email"]

        if User.objects.filter(username=email).exists():
            raise serializers.ValidationError(
                {"email": "Email already exists"}
            )

        user = User.objects.create_user(
            username=email,
            email=email,
            password=validated_data["password"],
            first_name=name
        )

        return user