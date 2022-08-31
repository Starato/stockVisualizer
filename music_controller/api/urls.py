from django.urls import path, include
from .views import Stock, Graph

urlpatterns = [
    path('stock', Stock.as_view()),
    path('graph', Graph.as_view())
]
