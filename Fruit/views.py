from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from Fruit.models import Fruit
from Fruit.serializers import FruitSerializer


# Create your views here.

class FruitListView(APIView):
    """
    List all fruits or create a new fruit.
    """
    def get(self, request, format=None):
        fruits = Fruit.objects.all()
        serializer = FruitSerializer(fruits, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = FruitSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FruitDetailView(APIView):
    """
    Retrieve, update or delete a fruit instance.
    """

    def get_object(self, pk):
        try:
            return Fruit.objects.get(pk=pk)
        except Fruit.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        fruit = self.get_object(pk)
        serializer = FruitSerializer(fruit)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        fruit = self.get_object(pk)
        serializer = FruitSerializer(fruit, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        fruit = self.get_object(pk)
        fruit.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)