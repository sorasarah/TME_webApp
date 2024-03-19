from rest_framework.serializers import ModelSerializer
from mytig.models import Product,User

class ProductsListSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        # fields = ['id']

class UsersListSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

