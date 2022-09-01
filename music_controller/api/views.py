import json
import requests
from datetime import datetime as dt
import pygal as pg
import pandas as pd
from rest_framework import generics, status
from .models import Stock
from .serializers import StockDataSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from api.apiKey import key

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

            searchEndpoint = f"https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords={ticker}&apikey={key}"
            r = requests.get(searchEndpoint)
            suggestTicker = r.json()


        return Response(suggestTicker, status=status.HTTP_200_OK)

class Graph(APIView):

    

    def post(self, request):

        if request.method == 'POST':
            body_unicode = request.body.decode('utf-8')
            json_body = json.loads(body_unicode)
            graphOptions = json_body

            ticker = graphOptions['ticker']
            chartType = graphOptions['chartType']
            timeSeries = graphOptions['timeSeries']
            timeInterval = graphOptions['timeInterval']
            startDate = graphOptions['startDate']
            endDate = graphOptions['endDate']

            dtStartDate = dt.strptime(startDate, "%Y-%m-%d")
            dtEndDate = dt.strptime(endDate, "%Y-%m-%d")

            xValue = []
            open = []
            high = []
            low = []
            close = []
            # volume = []
            match timeSeries:
                case "Intraday":
                    intraday = "TIME_SERIES_INTRADAY"
                    url = f"https://www.alphavantage.co/query?function={intraday}&symbol={ticker}&interval={timeInterval}&outputsize=full&apikey={key}"
                    response = requests.get(url)
                    jsonData = response.json()[f'Time Series ({timeInterval})']

                    for x, y in jsonData.items():
                        stockDatetime = dt.strptime(x, "%Y-%m-%d %H:%M:%S")
                        userSelectedDatetime = dt.combine(dt.strptime(startDate, "%Y-%m-%d"), dt.min.time())

                        if stockDatetime > userSelectedDatetime:
                            xValue.insert(0, x.split()[1])
                            open.insert(0, (float(y['1. open'])))
                            high.insert(0, (float(y['2. high'])))
                            low.insert(0, (float(y['3. low'])))
                            close.insert(0, (float(y['4. close'])))
                            # volume.append(int(y['5. volume']))
                case "Daily":
                    daily = "TIME_SERIES_DAILY"
                    url = f"https://www.alphavantage.co/query?function={daily}&symbol={ticker}&outputsize=full&apikey={key}"
                    response = requests.get(url)
                    jsonData = response.json()[f'Time Series (Daily)']

                    for x, y in jsonData.items():
                        stockDate = dt.strptime(x, "%Y-%m-%d")
                    
                        if dtStartDate <= stockDate <= dtEndDate:
                            xValue.insert(0, x)
                            open.insert(0, (float(y['1. open'])))
                            high.insert(0, (float(y['2. high'])))
                            low.insert(0, (float(y['3. low'])))
                            close.insert(0, (float(y['4. close'])))
                            # volume.append(int(y['5. volume']))
                case "Weekly":
                    weekly = "TIME_SERIES_WEEKLY"
                    url = f"https://www.alphavantage.co/query?function={weekly}&symbol={ticker}&outputsize=full&apikey={key}"
                    response = requests.get(url)
                    jsonData = response.json()['Weekly Time Series']

                    for x, y in jsonData.items():
                        stockDate = dt.strptime(x, "%Y-%m-%d")

                        if dtStartDate <= stockDate <= dtEndDate:
                            xValue.insert(0, x)
                            open.insert(0, (float(y['1. open'])))
                            high.insert(0, (float(y['2. high'])))
                            low.insert(0, (float(y['3. low'])))
                            close.insert(0, (float(y['4. close'])))
                            # volume.append(int(y['5. volume']))
                case "Monthly":
                    monthly = "TIME_SERIES_MONTHLY"
                    url = f"https://www.alphavantage.co/query?function={monthly}&symbol={ticker}&outputsize=full&apikey={key}"
                    response = requests.get(url)
                    jsonData = response.json()['Monthly Time Series']

                    for x, y in jsonData.items():
                        stockDate = dt.strptime(x, "%Y-%m-%d")

                        if dtStartDate <= stockDate <= dtEndDate:
                            xValue.insert(0, x)
                            open.insert(0, (float(y['1. open'])))
                            high.insert(0, (float(y['2. high'])))
                            low.insert(0, (float(y['3. low'])))
                            close.insert(0, (float(y['4. close'])))
                            # volume.append(int(y['5. volume']))

            match chartType:
                case "Line":
                    chart = pg.Line(height=300, dots_size=1, show_y_guides=False, fill=True, x_label_rotation=45)
                    chart.title = f'{ticker} from {startDate} to {endDate}'
                    chart.x_labels = xValue
                    chart.add('Open', open)
                    chart.add('High', high)
                    chart.add('Low', low)
                    chart.add('Close', close)
                    # chart.add('Volume', volume)
                    finalChart = chart.render_data_uri()
                case "Bar":
                    chart = pg.Bar(x_label_rotation=20)
        
        return Response(finalChart, status=status.HTTP_200_OK)

