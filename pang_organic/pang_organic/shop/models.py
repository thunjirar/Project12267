from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    # แก้ไขบรรทัดนี้: เปลี่ยนกลับเป็น ImageField
    image = models.ImageField(upload_to='products/', blank=True, null=True) 
    category = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.name