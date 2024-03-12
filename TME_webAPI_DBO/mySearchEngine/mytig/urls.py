from django.urls import path
from mytig import views

urlpatterns = [
    path('products/', views.RedirectionListeDeProduits.as_view()),
    path('product/<int:pk>/', views.RedirectionDetailProduit.as_view()),
    
    path('onsaleproducts/', views.PromoList.as_view()),
    path('onsaleproduct/<int:pk>/', views.PromoDetail.as_view()),
    
    # ----Exercice 3 Indexer la liste de tous les produits avec le champs ’availability’
    path('availableproducts/', views.AvailableProductsList.as_view()),
    path('availableproduct/<int:pk>/', views.AvailableProductDetail.as_view()),
    

     
    
]
