from rest_framework.serializers import ModelSerializer
from mytig.models import Product
from mytig.models import Transaction

class ProductsListSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
       
class ProductEditSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = ['sold_price', 'quantity', 'promotion_percent', 'promotion_price', 'promotion_status', 'sold_number']
        # fields = ['quantity']
        # fields = ['promotion_percent']

class TransactionsDataSerializer(ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
        # fields = ['id']

class UsersListSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

