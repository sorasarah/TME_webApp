import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from mytig.config import baseUrl

# Create your views here.
class RedirectionListeDeProduits(APIView):
    def get(self, request, format = None):
        response = requests.get(baseUrl + 'products/')
        jsondata = response.json()
        return Response(jsondata)
#    def post(self, request, format=None):
#        NO DEFITION of post --> server will return "405 NOT ALLOWED"

class RedirectionDetailProduit(APIView):
    def get(self, request, pk, format=None):
        try:
            response = requests.get(baseUrl+'product/'+str(pk)+'/')
            jsondata = response.json()
            return Response(jsondata)
        except:
            raise Http404
#    def put(self, request, pk, format=None):
#        NO DEFITION of put --> server will return "405 NOT ALLOWED"
#    def delete(self, request, pk, format=None):
#        NO DEFITION of delete --> server will return "405 NOT ALLOWED"



from mytig.models import ProduitEnPromotion
from mytig.serializers import ProduitEnPromotionSerializer
from django.http import Http404
from django.http import JsonResponse

class PromoList(APIView):
    def get(self, request, format=None):
        res=[]
        for prod in ProduitEnPromotion.objects.all():
            serializer = ProduitEnPromotionSerializer(prod)
            response = requests.get(baseUrl+'product/'+str(serializer.data['tigID'])+'/')
            jsondata = response.json()
            
            res.append(jsondata)
        return Response(res)
#    def post(self, request, format=None):
#        NO DEFITION of post --> server will return "405 NOT ALLOWED"

class PromoDetail(APIView):
    def get_object(self, pk):
        try:
            return ProduitEnPromotion.objects.get(pk=pk)
        except ProduitEnPromotion.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        prod = self.get_object(pk)
        serializer = ProduitEnPromotionSerializer(prod)
        response = requests.get(baseUrl+'product/'+str(serializer.data['tigID'])+'/')
        jsondata = response.json()
        return Response(jsondata)
#    def put(self, request, pk, format=None):
#        NO DEFITION of put --> server will return "405 NOT ALLOWED"
#    def delete(self, request, pk, format=None):
#        NO DEFITION of delete --> server will return "405 NOT ALLOWED"

# ------------Exercice 2 Clone de shipPoints-----------
# Create your views here.
class RedirectionShipPoints(APIView):
    def get(self, request, format = None):
        response = requests.get(baseUrl + 'shipPoints/')
        jsondata = response.json()
        return Response(jsondata)
#    def post(self, request, format=None):
#        NO DEFITION of post --> server will return "405 NOT ALLOWED"

class RedirectionDetailShipPoint(APIView):
    def get(self, request, pk, format=None):
        try:
            response = requests.get(baseUrl+'shipPoint/'+str(pk)+'/')
            jsondata = response.json()
            return Response(jsondata)
        except:
            raise Http404
#    def put(self, request, pk, format=None):
#        NO DEFITION of put --> server will return "405 NOT ALLOWED"
#    def delete(self, request, pk, format=None):
#        NO DEFITION of delete --> server will return "405 NOT ALLOWED"

# ----Exercice 3 Indexer la liste de tous les produits avec le champs ’availability’
from mytig.models import ProduitDisponible
from mytig.serializers import ProduitDisoponibleSerializer
from django.http import Http404
from django.http import JsonResponse

class AvailableProductsList(APIView):
    def get(self, request, format=None):
        res=[]
        for prod in ProduitDisponible.objects.all():
            serializer = ProduitDisoponibleSerializer(prod)
            response = requests.get(baseUrl+'product/'+str(serializer.data['tigID'])+'/')
            jsondata = response.json()
            res.append(jsondata)
        return Response(res)
#    def post(self, request, format=None):
#        NO DEFITION of post --> server will return "405 NOT ALLOWED"

class AvailableProductDetail(APIView):
    def get_object(self, pk):
        try:
            return ProduitDisponible.objects.get(pk=pk)
        except ProduitDisponible.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        prod = self.get_object(pk)
        serializer = ProduitDisoponibleSerializer(prod)
        response = requests.get(baseUrl+'product/'+str(serializer.data['tigID'])+'/')
        jsondata = response.json()
        return Response(jsondata)
#    def put(self, request, pk, format=None):
#        NO DEFITION of put --> server will return "405 NOT ALLOWED"
#    def delete(self, request, pk, format=None):
#        NO DEFITION of delete --> server will return "405 NOT ALLOWED"

# ----Exercice 5 Etendre le webAPI
from mytig.models import FishProduct
from mytig.serializers import FishProductSerializer
from django.http import Http404
from django.http import JsonResponse

class FishProductsList(APIView):
    def get(self, request, format=None):
        res=[]
        for prod in FishProduct.objects.all():
            serializer = FishProductSerializer(prod)
            if FishProductSerializer(data={'category' : '0'}):
            #(data={'tigID':str(product['id'])})
                response = requests.get(baseUrl+'product/'+str(serializer.data['tigID'])+'/')
                jsondata = response.json()
                res.append(jsondata)
        return Response(res)
