from django.core.management.base import BaseCommand, CommandError
from mytig.models import FishProduct
from mytig.serializers import FishProductSerializer
from mytig.config import baseUrl
import requests
import time

class Command(BaseCommand):
    help = 'Refresh the list of products which are fish.'

# ----Exercice 5 Etendre le webAPI
    def handle(self, *args, **options):
        self.stdout.write('['+time.ctime()+'] Refreshing data...')
        response = requests.get(baseUrl+'products/')
        jsondata = response.json()
        FishProduct.objects.all().delete()
        for product in jsondata:
            if product['category']:
                serializer = FishProductSerializer(data={'tigID':str(product['id'])})
                if serializer.is_valid():
                    serializer.save()
                    self.stdout.write(self.style.SUCCESS('['+time.ctime()+'] Successfully added product id="%s"' % product['id']))
        self.stdout.write('['+time.ctime()+'] Data refresh terminated.')
    
        