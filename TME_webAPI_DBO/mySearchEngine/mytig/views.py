import requests
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from mytig.models import Product
from mytig.serializers import ProductsListSerializer, UsersListSerializer
from mytig.models import Transaction
from mytig.serializers import ProductsListSerializer, ProductEditSerializer
from mytig.serializers import TransactionsDataSerializer
from django.http import JsonResponse
from mytig.config import baseUrl
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

# --------------------------partie login-------------------------------
import json
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.core import serializers

# classe d'authetifaction dans notre endPoints
class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'access_token': str(refresh.access_token),
                'refresh_token': str(refresh)
            })
        else: 
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        
    @api_view(['GET'])
    @permission_classes([IsAuthenticated])
    def protected_view(request):
        return Response({'message': 'This is a protected endpoint'})
        

    
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

# --------------------------partie product-------------------------------
class ProductsList(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        # Récupérer tous les produits depuis la base de données
        products = Product.objects.all()
        # Sérialiser les données des produits
        serializer = ProductsListSerializer(products, many=True)
        # Renvoyer la liste des produits sous forme de réponse JSON
        return Response(serializer.data)
    
    def post(self, request):
        serializer = ProductsListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)
    
    def patch(self, request, format=None):
        try:
            data = json.loads(request.body)
            for product in data:
                _product = Product.objects.get(pk=product.get('id'))
                print('avant', _product.quantity)
                print('après', product["quantity"])
                
                # Condition pour initier le type de transaction + gestion des nombres des vendus
                new_quantity = float(product["quantity"])
                dif_quantity = float(new_quantity) - float(_product.quantity)
                
                # condition gestion des quantités --> cas de l'achat 
                if new_quantity > _product.quantity:
                # if dif_quantity > 0 :
                    print("je suis dans le if des Q>q donc achat ")
                    transaction_price = dif_quantity * float(_product.purchase_price)
                    print("Achat", dif_quantity, _product.purchase_price, transaction_price)
                    # _product.sold_number = _product.sold_number
                    print("nb de ventes", _product.sold_number)
                    Transaction.objects.create(
                            transaction = '1',
                            transaction_price = transaction_price,
                        )
                    _product.save()
                # condition gestion des quantités --> cas de vente 
                else : 
                    print("je suis dans le else des Q>q")
                    transaction_price = abs(dif_quantity * float(_product.sold_price))
                    print(transaction_price)
                    new_sold_quantity = abs(dif_quantity)
                    _product.sold_number += new_sold_quantity
                    print(_product.sold_number)
                    Transaction.objects.create(
                            transaction = '0',
                            transaction_price = transaction_price,
                        )
                    _product.save()
                      
                new_promotion_percent = float(product["promotion_percent"])
                print(new_promotion_percent)
                # Gestion des calculs de promotions
                if new_promotion_percent != 0 :
                    print(product["promotion_percent"])
                    print("je suis dans le if de promo")
                    _product.promotion_status = True
                    _product.promotion_price = float(product['sold_price']) - ((float(product['sold_price']) * float(product['promotion_percent']))/ 100)
                    _product.promotion_percent = float(product['promotion_percent'])  
                    # print(_product.promotion_status, _product.promotion_price, _product.promotion_percent)
                    _product.save()
                else : 
                    print("je suis dans le else de promo")
                    _product.promotion_status = False
                    _product.promotion_percent = 0
                    _product.promotion_price = 0
                    _product.save()
                    
            _product.quantity = product["quantity"]  
            _product.sold_price = product["sold_price"] 
            print(_product.sold_price)
            _product.save()
            return Response(status=status.HTTP_207_MULTI_STATUS)  
        except Exception as e:
            print(e)
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

from rest_framework.authtoken.models import Token
    
# --------------------------partie transaction-------------------------------
class TransactionsData(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        transactionsData = Transaction.objects.all()
        serializer = TransactionsDataSerializer(transactionsData, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TransactionsDataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)
  
