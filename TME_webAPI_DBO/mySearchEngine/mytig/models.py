from django.db import models
from django.contrib.auth.hashers import make_password, check_password

class User(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=180)
    
    def set_password(self, raw_password): 
        self.password = make_password(raw_password)
    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

class Transaction(models.Model):
    id = models.AutoField(primary_key=True)
    TRANSACTION_TYPE = [
        ('0', 'Vente'),
        ('1', 'Achat'),
        ('2', 'Retrait'),
    ]
    transaction = models.CharField(max_length=20, choices=TRANSACTION_TYPE)
    add_date = models.DateTimeField(auto_now_add=True)
    edit_date = models.DateTimeField(auto_now=True)
    ca = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    taxes = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  
    
    def __str__(self):
        return f"Transaction {self.id}: {self.transaction}"  

class Product(models.Model):
    id = models.AutoField(primary_key=True) 
    name = models.CharField(max_length=100)
    description = models.TextField()
    purchase_price = models.DecimalField(max_digits=10, decimal_places=2)
    sold_price = models.DecimalField(max_digits=10, decimal_places=2)
    availability = models.BooleanField(default=True)
    CATEGORY_CHOICES = [
        ('0', 'Poissons'),
        ('1', 'Fruits-de-mer'),
        ('2', 'Crustacés'),
    ]
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    quantity = models.IntegerField(default=0)
    promotion_status = models.BooleanField(default=False)
    promotion_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    promotion_percent = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    sold_number = models.IntegerField(default=0)
    transaction = models.ManyToManyField(Transaction)
   
    def __str__(self):
        return self.name
    
    