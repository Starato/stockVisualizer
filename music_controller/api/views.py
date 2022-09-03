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

    def addToChart(chartData):
        chartType = chartData['chart']

        if chartType == 'Line':
            chart = pg.Line(height=300, dots_size=1, show_y_guides=False, fill=True, x_label_rotation=45)
        if chartType == "Bar":
            chart = pg.Bar(height=300, show_y_guides=False, x_label_rotation=45)

        chart.title = f"{chartData['ticker']} from {chartData['startDate']} to {chartData['endDate']}"
        chart.x_labels = chartData['x_labels']
        chart.add('Open', chartData['open'])
        chart.add('High', chartData['high'])
        chart.add('Low', chartData['low'])
        chart.add('Close', chartData['close'])
        # chart.add('Volume', volume)
        
        return chart.render_data_uri()

    def parseData(jsonData, datesData):
        graphData = {
            'x_labels': [],
            'open': [],
            'high': [],
            'low': [],
            'close': []
        }

        match datesData['timeSeries']:
            case "Intraday":
                for x, y in jsonData.items():
                    stockDatetime = dt.strptime(x, "%Y-%m-%d %H:%M:%S")

                    if stockDatetime > datesData['userSelectedDate']:
                        graphData['x_labels'].insert(0, x.split()[1])
                        graphData['open'].insert(0, (float(y['1. open'])))
                        graphData['high'].insert(0, (float(y['2. high'])))
                        graphData['low'].insert(0, (float(y['3. low'])))
                        graphData['close'].insert(0, (float(y['4. close'])))
                        # volume.append(int(y['5. volume']))
            case _:
                for x, y in jsonData.items():
                        stockDate = dt.strptime(x, "%Y-%m-%d")
                    
                        if datesData['dtStartDate'] <= stockDate <= datesData['dtEndDate']:
                            graphData['x_labels'].insert(0, x)
                            graphData['open'].insert(0, (float(y['1. open'])))
                            graphData['high'].insert(0, (float(y['2. high'])))
                            graphData['low'].insert(0, (float(y['3. low'])))
                            graphData['close'].insert(0, (float(y['4. close'])))
                            # volume.append(int(y['5. volume']))

        return graphData

    def post(self, request):

        if request.method == 'POST':
            body_unicode = request.body.decode('utf-8')
            json_body = json.loads(body_unicode)
            graphOptions = json_body

            #user graph option variables
            ticker = graphOptions['ticker']
            chartType = graphOptions['chartType']
            timeSeries = graphOptions['timeSeries']
            timeInterval = graphOptions['timeInterval']
            startDate = graphOptions['startDate']
            endDate = graphOptions['endDate']
            
            datesData = {
                'userSelectedDate': dt.combine(dt.strptime(startDate, "%Y-%m-%d"), dt.min.time()),
                'dtStartDate': dt.strptime(startDate, "%Y-%m-%d"),
                'dtEndDate': dt.strptime(endDate, "%Y-%m-%d"),
                'timeSeries': timeSeries
            }

            match timeSeries:
                case "Intraday":
                    intraday = "TIME_SERIES_INTRADAY"
                    url = f"https://www.alphavantage.co/query?function={intraday}&symbol={ticker}&interval={timeInterval}&outputsize=full&apikey={key}"
                    response = requests.get(url)
                    jsonData = response.json()[f'Time Series ({timeInterval})']
                    graphData = Graph.parseData(jsonData, datesData)
                case "Daily":
                    daily = "TIME_SERIES_DAILY"
                    url = f"https://www.alphavantage.co/query?function={daily}&symbol={ticker}&outputsize=full&apikey={key}"
                    response = requests.get(url)
                    jsonData = response.json()[f'Time Series (Daily)']
                    graphData = Graph.parseData(jsonData, datesData)
                case "Weekly":
                    weekly = "TIME_SERIES_WEEKLY"
                    url = f"https://www.alphavantage.co/query?function={weekly}&symbol={ticker}&outputsize=full&apikey={key}"
                    response = requests.get(url)
                    jsonData = response.json()['Weekly Time Series']
                    graphData = Graph.parseData(jsonData, datesData)
                case "Monthly":
                    monthly = "TIME_SERIES_MONTHLY"
                    url = f"https://www.alphavantage.co/query?function={monthly}&symbol={ticker}&outputsize=full&apikey={key}"
                    response = requests.get(url)
                    jsonData = response.json()['Monthly Time Series']
                    graphData = Graph.parseData(jsonData, datesData)

            #data
            chartData = {
                        'chart': chartType,
                        'ticker': ticker,
                        'startDate': startDate,
                        'endDate': endDate,
                        'x_labels': graphData['x_labels'],
                        'open': graphData['open'],
                        'high': graphData['high'],
                        'low': graphData['low'],
                        'close': graphData['close'],
                    }
            #output/render graph
            finalChart = Graph.addToChart(chartData)
            
        return Response(finalChart, status=status.HTTP_200_OK)

