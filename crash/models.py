from django.db import models

# Create your models here.
class Number(models.Model):
    value = models.DecimalField(max_digits=10, decimal_places=2)
    color = models.CharField(max_length=50)

    def __str__(self):
     return f"Value: {self.value}, Color: {self.color}"