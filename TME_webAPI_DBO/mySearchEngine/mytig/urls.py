from django.urls import path
from mytig import views
from mytig.views import ProductsList 

urlpatterns = [
    path('products/', views.RedirectionListeDeProduits.as_view()),
    path('product/<int:pk>/', views.RedirectionDetailProduit.as_view()),
    
    path('productsList/', views.ProductsList.as_view()),
    
]
