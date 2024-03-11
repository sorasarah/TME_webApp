from rest_framework.serializers import ModelSerializer
from mytig.models import ProduitEnPromotion
from mytig.models import ProduitDisponible
from mytig.models import FishProduct
from mytig.models import CrustaceProduct
from mytig.models import FruitDeMerProduct

class ProduitEnPromotionSerializer(ModelSerializer):
    class Meta:
        model = ProduitEnPromotion
        fields = ('id', 'tigID')
        
# ---- Indexer la liste de tous les produits avec le champs ’availability’
class ProduitDisoponibleSerializer(ModelSerializer):
    class Meta:
        model = ProduitDisponible
        fields = ('id', 'tigID')

# ---- Indexer les listes des produits avec leur catégorie    
class FishProductSerializer(ModelSerializer):
    class Meta:
        model = FishProduct
        fields = ('id', 'tigID')
        
class CrustaceProductSerializer(ModelSerializer):
    class Meta:
        model = CrustaceProduct
        fields = ('id', 'tigID')

class FruitDeMerProduct(ModelSerializer):
    class Meta: 
        model: FruitDeMerProduct
        fields = ('id', 'tigID')
