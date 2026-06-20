#!/usr/bin/env python
"""
Test script to verify Cloudinary is properly configured
"""
import os
import sys
from pathlib import Path

# Add backend to path
sys.path.insert(0, str(Path(__file__).resolve().parent))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

import django
django.setup()

# Now test Cloudinary
import cloudinary
from django.conf import settings

print("=" * 60)
print("CLOUDINARY CONFIGURATION TEST")
print("=" * 60)

# Check environment variables
print("\n1. Environment Variables:")
print(f"   CLOUDINARY_CLOUD_NAME: {os.getenv('CLOUDINARY_CLOUD_NAME', 'NOT SET')}")
print(f"   CLOUDINARY_API_KEY: {os.getenv('CLOUDINARY_API_KEY', 'NOT SET')}")
print(f"   CLOUDINARY_API_SECRET: {'SET' if os.getenv('CLOUDINARY_API_SECRET') else 'NOT SET'}")

# Check Cloudinary config
print("\n2. Cloudinary Config Object:")
print(f"   cloud_name: {cloudinary.config().cloud_name or 'NOT SET'}")
print(f"   api_key: {cloudinary.config().api_key or 'NOT SET'}")
print(f"   api_secret: {'SET' if cloudinary.config().api_secret else 'NOT SET'}")

# Check DEFAULT_FILE_STORAGE
print("\n3. Django Storage Configuration:")
print(f"   DEFAULT_FILE_STORAGE: {settings.DEFAULT_FILE_STORAGE}")

# Try uploading a test file
print("\n4. Test Upload (creating test file):")
try:
    import tempfile
    from django.core.files.base import ContentFile
    from products.models import ProductImage, Product
    
    # Check if we can access the models
    print("   ✓ Models imported successfully")
    
    # Check if we can create a product
    test_product = Product.objects.create(
        name="Test Product",
        brand="Test Brand",
        category="Test",
        price=99.99,
        description="Test"
    )
    print(f"   ✓ Test product created: ID {test_product.id}")
    
    # Try to create an image with Cloudinary
    from PIL import Image
    img = Image.new('RGB', (100, 100), color='red')
    img_path = tempfile.NamedTemporaryFile(suffix='.jpg', delete=False).name
    img.save(img_path)
    
    with open(img_path, 'rb') as f:
        from django.core.files.uploadedfile import InMemoryUploadedFile
        uploaded_file = InMemoryUploadedFile(
            f, None, 'test.jpg', 'image/jpeg', f.seek(0, 2) or 1024, None
        )
        product_image = ProductImage.objects.create(
            product=test_product,
            image=uploaded_file
        )
        print(f"   ✓ Image uploaded to Cloudinary: {product_image.image.url}")
        
        # Clean up
        product_image.delete()
        test_product.delete()
        os.remove(img_path)
        print("   ✓ Test cleanup successful")
    
except Exception as e:
    print(f"   ✗ Error: {str(e)}")
    import traceback
    traceback.print_exc()

print("\n" + "=" * 60)
print("TEST COMPLETE")
print("=" * 60)
