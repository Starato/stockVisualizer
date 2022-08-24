from django.db import models
class Stock(models.Model):
    ticker = models.CharField(max_length=5)
    chart_type = models.CharField(max_length=4, null=True)
    interval = models.CharField(max_length=10, null=True)
    intraday = models.CharField(max_length=10, null=True)
    start_date = models.DateField(null=True)
    end_date = models.DateField(null=True)



