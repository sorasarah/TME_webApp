from django.urls import path
from mytig import views
from mytig.views import ProductsList 
from mytig.views import TransactionsData

urlpatterns = [
    path('products/', views.RedirectionListeDeProduits.as_view()),
    path('product/<int:pk>/', views.RedirectionDetailProduit.as_view()),
    
    path('productsList/', views.ProductsList.as_view(), name='product-list'),
    path('transactionsData/', views.TransactionsData.as_view(), name='transaction-data'),
    
]
