from rest_framework import serializers

from Fruit.models import Fruit


class FruitSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=255, required=True)
    price = serializers.FloatField(required=True)



    class Meta:
        model = Fruit
        fields = ('id', 'name', 'price')
        # The id is the primary key ( created automatically by Python ).
