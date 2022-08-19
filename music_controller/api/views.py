import json
import requests
from rest_framework import generics, status
# from .serializers import RoomSerializer, CreateRoomSerializer
# from .models import Room
from .models import Stock
from .serializers import StockDataSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

# class RoomView(generics.ListAPIView):
#     queryset = Room.objects.all()
#     serializer_class = RoomSerializer

# class CreateRoomView(APIView):
#     serializer_class = CreateRoomSerializer

#     def post(self, request, format=None):
#         if not self.request.session.exists(self.request.session.session_key):
#             self.request.session.create()

#         serializer = self.serializer_class(data=request.data)
#         if serializer.is_valid():
#             guest_can_pause = serializer.data.get('guest_can_pause')
#             votes_to_skip = serializer.data.get('votes_to_skip')
#             host = self.request.session.session_key
#             queryset = Room.objects.filter(host=host)
#             if queryset.exists():
#                 room = queryset[0]
#                 room.guest_can_pause = guest_can_pause
#                 room.votes_to_skip = votes_to_skip
#                 room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
#             else:
#                 room = Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
#                 room.save()
            
#             return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)

class StockHomeView(generics.ListAPIView):
    queryset = Stock.objects.all()
    serializer_class = StockDataSerializer

class testView(APIView):
    # serializer_class = testSerializer

    def post(self, request, format=None):
        
        if request.method == 'POST':
            body_unicode = request.body.decode('utf-8')
            json_body = json.loads(body_unicode)
            ticker = json_body["ticker"]

            APIkey = "TN4N0BLKKUHTCFZG"
            searchEndpoint = f"https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords={ticker}&apikey={APIkey}"
            r = requests.get(searchEndpoint)
            suggestTicker = r.json()


        return Response(suggestTicker, status=status.HTTP_200_OK)
        
        # if not self.request.session.exists(self.request.session.session_key):
        #     self.request.session.create()
        
        # serializer = self.serializer_class(data=request.data)
        # if serializer.is_valid():
        #     ticker = serializer.data.get('ticker')
        #     chart_type = serializer.data.get('chart_type')
        #     interval = serializer.data.get('interval')
        #     intraday = serializer.data.get('intraday')
        #     start_date = serializer.data.get('start_date')
        #     end_date = serializer.data.get('end_date')

        #     stock = Stock(ticker=ticker,
        #                     chart_type=chart_type,
        #                     interval=interval,
        #                     intraday=intraday,
        #                     start_date=start_date,
        #                     end_date=end_date)
        #     stock.save()

        

        #     return Response(StockDataSerializer(stock).data, status=status.HTTP_200_OK)




 # matchPlaceholder = None


        # match matchPlaceholder:
        #     case "1":
        #         intraInterval = userObject["timeSeriesObject"]["interval"]
        #         intraday = "TIME_SERIES_INTRADAY"
        #         url = f"https://www.alphavantage.co/query?function={intraday}&symbol={symbol}&interval={intraInterval}min&outputsize=full&apikey={key}&datatype=csv"
        #     case "2":
        #         daily = "TIME_SERIES_DAILY"
        #         url = f"https://www.alphavantage.co/query?function={daily}&symbol={symbol}&outputsize=full&apikey={key}&datatype=csv"
        #     case "3":
        #         weekly = "TIME_SERIES_WEEKLY"
        #         url = f"https://www.alphavantage.co/query?function={weekly}&symbol={symbol}&outputsize=full&apikey={key}&datatype=csv"
        #     case "4":
        #         monthly = "TIME_SERIES_MONTHLY"
        #         url = f"https://www.alphavantage.co/query?function={monthly}&symbol={symbol}&outputsize=full&apikey={key}&datatype=csv"