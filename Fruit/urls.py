from django.urls import path

from Fruit.views import FruitListView, FruitDetailView

urlpatterns = [
    path('fruits/', FruitListView.as_view()),
    path('fruits/<int:pk>/', FruitDetailView.as_view()),
]