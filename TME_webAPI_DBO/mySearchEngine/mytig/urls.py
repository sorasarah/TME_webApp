from django.urls import path
from mytig import views

urlpatterns = [
    path('products/', views.RedirectionListeDeProduits.as_view()),
    path('product/<int:pk>/', views.RedirectionDetailProduit.as_view()),
    path('onsaleproducts/', views.PromoList.as_view()),
    path('onsaleproduct/<int:pk>/', views.PromoDetail.as_view()),
    
    #----Exercice 2 Clone de shipPoints
    path('shipPoints/', views.RedirectionShipPoints.as_view()),
    path('shipPoint/<int:pk>/', views.RedirectionDetailShipPoint.as_view()),
    
    # ----Exercice 3 Indexer la liste de tous les produits avec le champs ’availability’
    path('availableproducts/', views.AvailableProductsList.as_view()),
    path('availableproduct/<int:pk>/', views.AvailableProductDetail.as_view()),
    
    # ----Exercice 5 Etendre le webAPI
    path('poissons/', views.FishProductsList.as_view()),
    # path('poisson/<int:pk>/', views.PoissonProductDetail.as_view()),
    # path('crustaces/', views.CrustacesProductsList.as_view()),
    # path('crustace/<int:pk>/', views.CrustaceProductDetail.as_view()),
    # path('coquillages/', views.CoquillagesProductsList.as_view()),
    # path('coquillage/<int:pk>/', views.CoquillageProductDetail.as_view()),
     
    
]
