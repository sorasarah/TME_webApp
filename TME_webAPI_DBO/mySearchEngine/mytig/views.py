import requests
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from mytig.models import Product
from mytig.models import Transaction
from mytig.serializers import ProductsListSerializer, ProductEditSerializer
from mytig.serializers import TransactionsDataSerializer
from django.http import JsonResponse
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
        

class ProductsList(APIView):
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
    
    def put(self, request, pk, format=None):
        try:
            product = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response(status=404)
        
        serializer = ProductsListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    def patch(self, request, format=None):
        try:
            data = json.loads(request.body)
            for product in data:
                print(product.get('id'), "id") 
                # print("product", product)
                _product = Product.objects.get(pk=product.get('id'))
                # print(_product, " from model")
                serializer = ProductEditSerializer(_product, data=product, partial=True)
                # print(serializers.__repr__)
                if serializer.is_valid():
                    print("ok for", product)
                    serializer.save()    
                else:
                    print(serializer.errors)
                    print("mon serializer ne fonctionne pas")
            return Response(status=status.HTTP_207_MULTI_STATUS)  
        except Exception as e:
            print(e)
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
class TransactionsData(APIView):
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
