from django.urls import path
from .views import index
urlpatterns = [
    path('', index),
    path('ticker-results/<str:tickerResults>', index),
]