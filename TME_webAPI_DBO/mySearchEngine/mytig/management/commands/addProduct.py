from django.core.management.base import BaseCommand, CommandError
from django.utils import timezone
from models import Products, Category


class ProductData(BaseCommand):
    def handle(self, *args, **kwargs):
        data = [
            {
                "name": "Anchois",
                "purchase_price": 6.99,
                "sold_price": None,
                "quantity": 20,
                "description": "Mediterranean anchovies",
                "availability": False
            },
            {
                "name": "Bar",
                "purchase_price": 20.99,
                "sold_price": None,
                "quantity": 45,
                "description": "Wild sea bass from Brittany",
                "availability": False
            },
            {
                "name": "Dorade",
                "purchase_price": 12.99,
                "sold_price": None,
                "quantity": 25,
                "description": "Mediterranean sea bream",
                "availability": False
            },
            {
                "name": "Espadon",
                "purchase_price": 17.99,
                "sold_price": None,
                "quantity": 15,
                "description": "Fresh swordfish",
                "availability": False
            },
            {
                "name": "Maquereau",
                "purchase_price": 7.99,
                "sold_price": None,
                "quantity": 60,
                "description": "Fresh mackerel caught off the coast",
                "availability": True
            },
            {
                "name": "Morue",
                "purchase_price": 11.99,
                "sold_price": None,
                "quantity": 35,
                "description": "Atlantic cod for traditional fish and chips",
                "availability": True
            },            
            {
                "name": "Saumon",
                "purchase_price": 15.99,
                "sold_price": 12.99,
                "quantity": 50,
                "description": "Fresh Atlantic salmon fillets",
                "availability": False
            },
            {
                "name": "Sole",
                "purchase_price": 18.99,
                "sold_price": None,
                "quantity": 30,
                "description": "Dover sole from the English Channel",
                "availability": False
            },
            {
                "name": "Thon",
                "purchase_price": 14.99,
                "sold_price": None,
                "quantity": 55,
                "description": "Yellowfin tuna steaks",
                "availability": True
            },
            {
                "name": "Truite",
                "purchase_price": 10.49,
                "sold_price": 8.99,
                "quantity": 40,
                "description": "Rainbow trout from local rivers",
                "availability": False
            },            
        ]
        category = Category.objects.get(id=1)
        for product in data:
            Products.objects.create(
                name=product["name"],
                purchase_price=product["purchase_price"],
                sold_price=product["sold_price"],
                quantity=product["quantity"],
                description=product["description"],
                availability=product["availability"],
                date_edit=timezone.now(),
                date_add=timezone.now(),
                category_product=category
            )
        
        data = [
            {
                "name": "Crevettes",
                "purchase_price": 15.99,
                "sold_price": 12.99,
                "quantity": 50,
                "description": "Crevettes fraîches de la côte atlantique",
                "availability": True
            },
            {
                "name": "Huîtres",
                "purchase_price": 10.49,
                "sold_price": 8.99,
                "quantity": 40,
                "description": "Huîtres spéciales de Bretagne",
                "availability": False
            },
            {
                "name": "Coquilles Saint-Jacques",
                "purchase_price": 18.99,
                "sold_price": None,
                "quantity": 30,
                "description": "Délicieuses coquilles Saint-Jacques fraîches",
                "availability": False
            },
            {
                "name": "Moules",
                "purchase_price": 7.99,
                "sold_price": None,
                "quantity": 60,
                "description": "Moules fraîches de la baie de Mont-Saint-Michel",
                "availability": True
            },
            {
                "name": "Langoustines",
                "purchase_price": 12.99,
                "sold_price": None,
                "quantity": 25,
                "description": "Langoustines fraîches pêchées au large",
                "availability": False
            },
            {
                "name": "Palourdes",
                "purchase_price": 11.99,
                "sold_price": None,
                "quantity": 35,
                "description": "Palourdes fraîches de Normandie",
                "availability": True
            },
            {
                "name": "Bigorneaux",
                "purchase_price": 20.99,
                "sold_price": None,
                "quantity": 45,
                "description": "Bigorneaux fraîchement pêchés sur la côte",
                "availability": False
            },
            {
                "name": "Crabes",
                "purchase_price": 6.99,
                "sold_price": None,
                "quantity": 20,
                "description": "Crabes frais de l'océan Atlantique",
                "availability": False
            },
            {
                "name": "Homards",
                "purchase_price": 14.99,
                "sold_price": None,
                "quantity": 55,
                "description": "Homards fraîchement pêchés dans les eaux côtières",
                "availability": True
            },
            {
                "name": "Saint-Pierre",
                "purchase_price": 17.99,
                "sold_price": None,
                "quantity": 15,
                "description": "Saint-Pierre sauvage de la Manche",
                "availability": False
            }
        ]

        category = Category.objects.get(id=2)
        for product in data:
            Products.objects.create(
                name=product["name"],
                purchase_prix=product["purchase_price"],
                sold_price=product["sold_price"],
                quantity=product["quantity"],
                description=product["description"],
                availability=product["availability"],
                date_edit=timezone.now(),
                date_add=timezone.now(),
                category=category
            )
            
        data = [
            {
                "name": "Crevettes géantes",
                "purchase_price": 15.99,
                "sold_price": 12.99,
                "quantity": 50,
                "description": "Crevettes géantes fraîches de la mer du Nord",
                "availability": True
            },
            {
                "name": "Homard breton",
                "purchase_price": 10.49,
                "sold_price": 8.99,
                "quantity": 40,
                "description": "Homard breton de qualité supérieure",
                "availability": False
            },
            {
                "name": "Crabe des neiges",
                "purchase_price": 18.99,
                "sold_price": None,
                "quantity": 30,
                "description": "Crabe des neiges frais pêché dans les eaux froides",
                "availability": False
            },
            {
                "name": "Langoustines",
                "purchase_price": 7.99,
                "sold_price": None,
                "quantity": 60,
                "description": "Langoustines fraîches de la côte bretonne",
                "availability": True
            },
            {
                "name": "Écrevisses",
                "purchase_price": 12.99,
                "sold_price": None,
                "quantity": 25,
                "description": "Écrevisses fraîches de rivière",
                "availability": False
            },
            {
                "name": "Crevettes roses",
                "purchase_price": 11.99,
                "sold_price": None,
                "quantity": 35,
                "description": "Crevettes roses fraîches de Méditerranée",
                "availability": True
            },
            {
                "name": "Tourteau",
                "purchase_price": 20.99,
                "sold_price": None,
                "quantity": 45,
                "description": "Tourteau fraîchement pêché sur les côtes",
                "availability": False
            },
            {
                "name": "Crabe royal",
                "purchase_price": 6.99,
                "sold_price": None,
                "quantity": 20,
                "description": "Crabe royal des eaux froides de l'océan Pacifique",
                "availability": False
            },
            {
                "name": "Crevettes tigrées",
                "purchase_price": 14.99,
                "sold_price": None,
                "quantity": 55,
                "description": "Crevettes tigrées géantes de l'Asie du Sud-Est",
                "availability": True
            },
            {
                "name": "Homard européen",
                "purchase_price": 17.99,
                "sold_price": None,
                "quantity": 15,
                "description": "Homard européen de la Manche",
                "availability": False
            }
        ]

        category = Category.objects.get(id=3)
        for product in data:
            Products.objects.create(
                name=product["name"],
                prix=product["purchase_price"],
                sold_price=product["sold_price"],
                quantity=product["quantity"],
                description=product["description"],
                availability=product["availability"],
                date_edit=timezone.now(),
                date_add=timezone.now(),
                category=category
            )


              