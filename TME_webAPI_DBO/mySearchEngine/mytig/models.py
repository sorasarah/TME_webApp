from django.db import models

# Create your models here.
class ProduitEnPromotion(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    tigID = models.IntegerField(default='-1')

    class Meta:
        ordering = ('tigID',)


# ----Exercice 3 Indexer la liste de tous les produits avec le champs ’availability’
# Create your models here.
class ProduitDisponible(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    tigID = models.IntegerField(default='-1')

    class Meta:
        ordering = ('tigID',)
        
# ----Exercice 5 Etendre le webAPI
class FishProduct(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    tigID = models.IntegerField(default='-1')

    class Meta:
        ordering = ('tigID',)
        
class CrustaceProduct(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    tigID = models.IntegerField(default='-1')

    class Meta:
        ordering = ('tigID',)
        
class CoquillageProduct(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    tigID = models.IntegerField(default='-1')
    class Meta:
        ordering = ('tigID',)