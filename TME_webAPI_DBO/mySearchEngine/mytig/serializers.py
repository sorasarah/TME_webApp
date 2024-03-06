from rest_framework.serializers import ModelSerializer
from mytig.models import ProduitEnPromotion
from mytig.models import ProduitDisponible
from mytig.models import FishProduct
from mytig.models import CrustaceProduct
from mytig.models import CoquillageProduct

class ProduitEnPromotionSerializer(ModelSerializer):
    class Meta:
        model = ProduitEnPromotion
        fields = ('id', 'tigID')
        
# ----Exercice 3 Indexer la liste de tous les produits avec le champs ’availability’
class ProduitDisoponibleSerializer(ModelSerializer):
    class Meta:
        model = ProduitDisponible
        fields = ('id', 'tigID')

# ----Exercice 5 Etendre le webAPI     
class FishProductSerializer(ModelSerializer):
    class Meta:
        model = FishProduct
        fields = ('id', 'tigID')
        
class CrustaceProductSerializer(ModelSerializer):
    class Meta:
        model = CrustaceProduct
        fields = ('id', 'tigID')

class CoquillageProduct(ModelSerializer):
    class Meta: 
        model: CoquillageProduct
        fields = ('id', 'tigID')
