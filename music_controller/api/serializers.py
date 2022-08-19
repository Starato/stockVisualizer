from rest_framework import serializers
from .models import Stock
# from .models import Room

# class RoomSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Room
#         fields = ("id",
#                 "code",
#                 "host",
#                 "guest_can_pause",
#                 "votes_to_skip",
#                 "created_at",
#                 )

# class CreateRoomSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Room
#         fields = ('guest_can_pause', 'votes_to_skip')

class StockDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ("id",
                "ticker",
                "chart_type",
                "interval",
                "intraday",
                "start_date",
                "end_date"
                )

# class testSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Stock
#         fields = ("ticker",
#                 "chart_type",
#                 "interval",
#                 "intraday",
#                 "start_date",
#                 "end_date"
#                 )

