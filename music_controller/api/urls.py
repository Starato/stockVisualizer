from django.urls import path, include
# from .views import RoomView, CreateRoomView
from .views import Stock

urlpatterns = [
    # path('room', RoomView.as_view()),
    # path('create-room', CreateRoomView.as_view())
    path('stock', Stock.as_view())
]
