from rest_framework.serializers import ModelSerializer
from mytig.models import Product, User
from mytig.models import Transaction

class ProductsListSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
       
class ProductEditSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = ['sold_price', 'quantity', 'promotion_percent', 'promotion_price', 'promotion_status', 'sold_number']

class TransactionsDataSerializer(ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['add_date', 'transaction_price', 'taxes', 'transaction']    

class UsersListSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'




