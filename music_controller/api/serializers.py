from rest_framework import serializers
from .models import Stock
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

