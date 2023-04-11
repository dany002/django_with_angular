from rest_framework import serializers

from Fruit.models import Fruit


class FruitSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=255, required=True)
    price = serializers.FloatField(required=True)

    def validate(self, data):
        if data['price'] < 0:
            raise serializers.ValidationError("Price has to be greater than 0.")
        return data

    class Meta:
        model = Fruit
        fields = ('id', 'name', 'price')
        # The id is the primary key ( created automatically by Python ).
