from django.core.management.base import BaseCommand, CommandError
from mytig.models import Transaction
from datetime import datetime


class Command(BaseCommand):
    help = 'Ajoute des données des transactions à la base de données'
    
    def handle(self, *args, **kwargs):
        data = [
            { 
             "transaction": '0',
                "add_date": datetime(2022, 3, 18, 10, 0, 0),
                "transaction_price": 1753.78,
            },
            {
                "transaction": '1',
                "add_date": datetime(2022, 5, 19, 10, 0, 0),
                "transaction_price": 2560.00,
            },
            {
                "transaction": '0',
                "add_date": datetime(2022, 1, 22, 10, 0, 0),
                "transaction_price": 1560.78,
            },
            {
                "transaction": '0',
                "add_date": datetime(2022, 2, 24, 10, 0, 0),
                "transaction_price": 2899.80,
            },
             {
                "transaction": '0',
                "add_date": datetime(2022, 3, 22, 10, 0, 0),
                "transaction_price": 1560.78,
            },
            {
                "transaction": '0',
                "add_date": datetime(2022, 7, 24, 10, 0, 0),
                "transaction_price": 2899.80,
            },
            {
                "transaction": '0',
                "add_date": datetime(2022, 9, 25, 10, 0, 0),
                "transaction_price": 989.80,
            },
            {
                "transaction": '1',
                "add_date": datetime(2023, 11, 30, 10, 0, 0),
                "transaction_price": 1700,
            },
            {
                "transaction": '0',
                "add_date": datetime(2023, 12, 1, 10, 0, 0),
                "transaction_price": 569.68,
            },
            {
                "transaction": '0',
                "add_date": datetime(2023, 12, 3, 10, 0, 0),
                "transaction_price": 980.96,
            },
            {
                "transaction": '0',
                "add_date": datetime(2023, 12, 5, 10, 0, 0),
                "transaction_price": 600.23,
            },
            {
                "transaction": '0',
                "add_date": datetime(2023, 12, 5, 10, 0, 0),
                "transaction_price": 453.78,
            },
            {
                "transaction": '0',
                "add_date": datetime(2023, 12, 8, 10, 0, 0),
                "transaction_price": 753.78,
            },
            {
                "transaction": '1',
                "add_date": datetime(2023, 12, 11, 10, 0, 0),
                "transaction_price": 1700.90,
            },
            {
                "transaction": '0',
                "add_date": datetime(2023, 12, 13, 10, 0, 0),
                "transaction_price": 453.25,
            },
            {
                "transaction": '0',
                "add_date": datetime(2023, 12, 18, 10, 0, 0),
                "transaction_price": 1753.78,
            },
            {
                "transaction": '1',
                "add_date": datetime(2023, 12, 18, 10, 0, 0),
                "transaction_price": 2560.00,
            },
            {
                "transaction": '0',
                "add_date": datetime(2023, 12, 22, 10, 0, 0),
                "transaction_price": 1560.78,
            },
            {
                "transaction": '0',
                "add_date": datetime(2023, 12, 24, 10, 0, 0),
                "transaction_price": 2899.80,
            },
            {
                "transaction": '0',
                "add_date": datetime(2024, 1, 25, 10, 0, 0),
                "transaction_price": 989.80,
            },
            {
                "transaction": '1',
                "add_date": datetime(2024, 1, 27, 10, 0, 0),
                "transaction_price": 1700,
            },
            {
                "transaction": '0',
                "add_date": datetime(2024, 1, 28, 10, 0, 0),
                "transaction_price": 569.68,
            },
            {
                "transaction": '0',
                "add_date": datetime(2024, 2, 3, 10, 0, 0),
                "transaction_price": 980.96,
            },
            {
                "transaction": '0',
                "add_date": datetime(2024, 2, 5, 10, 0, 0),
                "transaction_price": 600.23,
            },
            {
                "transaction": '0',
                "add_date": datetime(2024, 2, 15, 10, 0, 0),
                "transaction_price": 453.78,
            },
            {
                "transaction": '0',
                "add_date": datetime(2024, 2, 18, 10, 0, 0),
                "transaction_price": 753.78,
            },
            {
                "transaction": '1',
                "add_date": datetime(2024, 3, 11, 10, 0, 0),
                "transaction_price": 1700.90,
            },
            {
                "transaction": '0',
                "add_date": datetime(2024, 3, 13, 10, 0, 0),
                "transaction_price": 453.25,
            },
            {
                "transaction": '0',
                "add_date": datetime(2024, 3, 18, 10, 0, 0),
                "transaction_price": 1753.78,
            },
            {
                "transaction": '1',
                "add_date": datetime(2024, 3, 19, 10, 0, 0),
                "transaction_price": 2560.00,
            },
            {
                "transaction": '0',
                "add_date": datetime(2024, 3, 22, 10, 0, 0),
                "transaction_price": 1560.78,
            },
            {
                "transaction": '0',
                "add_date": datetime(2024, 3, 24, 10, 0, 0),
                "transaction_price": 2899.80,
            },
            {
                "transaction": '0',
                "add_date": datetime(2024, 3, 25, 10, 0, 0),
                "transaction_price": 989.80,
            },
        ]
                
        for trans_data in data:       
            transaction = Transaction.objects.create(**trans_data)
            self.stdout.write(self.style.SUCCESS(f"Transaction '{transaction.transaction}' ajouté à la base de données."))
        self.stdout.write(self.style.SUCCESS("Tous les transaction ont été ajoutés avec succès."))