import requests
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from mytig.models import Product
from mytig.models import Transaction
from mytig.serializers import ProductsListSerializer
from mytig.serializers import TransactionsDataSerializer
from django.http import JsonResponse
import json
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

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
    
    def patch(self, request,pk=None, format=None):
        try:
            # Charger les identifiants des produits depuis le corps de la requête
            products_ids = Product.objects.all()
            print(products_ids) 
            # Convertir les identifiants en liste d'entiers
            # product_ids = [int(id) for id in ids]
            
            # # Récupérer les produits correspondants aux identifiants
            # products = Product.objects.filter(pk__in=product_ids)
            # # Vérifier si les produits existent
            # if not products:
            #     print('je suis dans if not product')
            #     return Response("Aucun produit trouvé", status=status.HTTP_404_NOT_FOUND)
            # Créer un dictionnaire avec les identifiants des produits et les données de chaque produit
            # products_data = {}
            # for product in products:
            #     products_data[product.pk] = request.data
            # # Initialiser le serializer avec les données des produits
            # serializer = ProductsListSerializer(products, data=products_data, partial=True, many=True)
            # # Valider et sauvegarder les données
            # if serializer.is_valid():
            #     serializer.save()
            #     print('je suis dans serializer')
            #     return Response(serializer.data)
            print('je suis dans le try')
            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(status=status.HTTP_100_CONTINUE)
            
        except Exception as e:
            print('erreur')
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
