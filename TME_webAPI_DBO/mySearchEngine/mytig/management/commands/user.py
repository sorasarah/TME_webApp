from typing import Any
from django.core.management.base import BaseCommand, CommandError
from mytig.models import User


class Command(BaseCommand):
    help = 'Ajoute des données de produits à la base de données'
    
    def handle(self, *args, **kwargs):
        data = [
            {
                "username": "Admin",
                "password": "fishOcean123",
            }
        ]
        for user_data in data:       
            user = User.objects.create(**user_data)
            self.stdout.write(self.style.SUCCESS(f"User '{user.username}' ajouté à la base de données."))
        self.stdout.write(self.style.SUCCESS("Tous les users ont été ajoutés avec succès."))