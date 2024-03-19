import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from mytig.models import Product
from mytig.serializers import ProductsListSerializer, UsersListSerializer
from django.http import JsonResponse
from mytig.config import baseUrl
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

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

class ProductsList(APIView):
    def get(self, request, format=None):
        # Récupérer tous les produits depuis la base de données
        products = Product.objects.all()
        # Sérialiser les données des produits
        serializer = ProductsListSerializer(products, many=True)
        # Renvoyer la liste des produits sous forme de réponse JSON
        return Response(serializer.data)

from rest_framework.authtoken.models import Token

class Login(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate user
        user = authenticate(username=username, password=password)
        if user is not None:
            # User is authenticated, generate or retrieve token
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})  # Return token key upon successful login
        else:
            # Authentication failed
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
