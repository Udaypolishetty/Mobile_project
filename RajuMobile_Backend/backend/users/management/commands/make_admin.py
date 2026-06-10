from django.core.management.base import BaseCommand
from django.contrib.auth.models import User


class Command(BaseCommand):
    help = "Make a user admin/staff with superuser privileges"

    def add_arguments(self, parser):
        parser.add_argument("email", type=str, help="Email of the user")

    def handle(self, *args, **options):
        email = options["email"].lower().strip()
        
        try:
            user = User.objects.get(email=email)
            user.is_staff = True
            user.is_superuser = True
            user.save()
            self.stdout.write(
                self.style.SUCCESS(
                    f"✓ User '{email}' is now admin with staff access"
                )
            )
        except User.DoesNotExist:
            self.stdout.write(
                self.style.ERROR(f"✗ User '{email}' not found")
            )
