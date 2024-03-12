from rest_framework.serializers import ModelSerializer
from mytig.models import Product

class ProductsListSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        # fields = ['id']


