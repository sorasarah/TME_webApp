from django.core.management.base import BaseCommand, CommandError
from mytig.models import Transaction
from datetime import datetime


class Command(BaseCommand):
    help = 'Ajoute des données de produits à la base de données'
    
    def handle(self, *args, **kwargs):
        data = [
            {
                "transaction": '0',
                "add_date": datetime(2024, 1, 1, 10, 0, 0),
                "edit_date": datetime(2024, 1, 1, 10, 0, 0),
                "ca": 1000,
                "taxes": 30,
            },
                        {
                "transaction": '1',
                "add_date": datetime(2024, 1, 1, 10, 0, 0),
                "edit_date": datetime(2024, 1, 1, 10, 0, 0),
                "ca": 2000,
                "taxes": 60,
            },
                                    {
                "transaction": '0',
                "add_date": datetime(2024, 1, 1, 10, 0, 0),
                "edit_date": datetime(2024, 1, 1, 10, 0, 0),
                "ca": 3000,
                "taxes": 90,
            },
        ]
                
        for trans_data in data:       
            transaction = Transaction.objects.create(**trans_data)
            self.stdout.write(self.style.SUCCESS(f"Transaction '{transaction.transaction}' ajouté à la base de données."))
        self.stdout.write(self.style.SUCCESS("Tous les transaction ont été ajoutés avec succès."))