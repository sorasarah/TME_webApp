from rest_framework.serializers import ModelSerializer
from mytig.models import Product
from mytig.models import Transaction

class ProductsListSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        # fields = ['id']


class TransactionsDataSerializer(ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
        # fields = ['id']