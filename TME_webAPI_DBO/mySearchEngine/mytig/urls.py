from django.urls import path
from mytig import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from mytig.views import ProductsList 
from mytig.views import TransactionsData

urlpatterns = [
    path('login/', views.Login.as_view, name='login'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    path('productsList/', views.ProductsList.as_view(), name='product-list'),
    path('productsList/<int:pk>/', views.ProductsList.as_view(), name='product-detail'),
    path('transactionsData/', views.TransactionsData.as_view(), name='transaction-data'),   
]


