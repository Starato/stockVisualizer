from django.urls import path
from .views import index
urlpatterns = [
    path('home', index),
    path('ticker-results/<str:tickerResults>', index),
    path('graph', index),
]