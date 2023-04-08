from django.db import models

# Create your models here.

class Fruit(models.Model):
    name = models.CharField(max_length=255)
    price = models.FloatField()

    def __str__(self):
        return f"Name: {self.name} Price: {self.price}"
