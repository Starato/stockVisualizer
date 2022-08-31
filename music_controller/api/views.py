import json
import requests
from rest_framework import generics, status
from .models import Stock
from .serializers import StockDataSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
import apiKey

class StockHomeView(generics.ListAPIView):
    queryset = Stock.objects.all()
    serializer_class = StockDataSerializer

class Stock(APIView):
    # serializer_class = testSerializer

    def post(self, request):
        
        if request.method == 'POST':
            body_unicode = request.body.decode('utf-8')
            json_body = json.loads(body_unicode)
            ticker = json_body["ticker"]

            searchEndpoint = f"https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords={ticker}&apikey={apiKey.apiKey}"
            r = requests.get(searchEndpoint)
            suggestTicker = r.json()


        return Response(suggestTicker, status=status.HTTP_200_OK)

class Graph(APIView):

    def post(self, request):
        None


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