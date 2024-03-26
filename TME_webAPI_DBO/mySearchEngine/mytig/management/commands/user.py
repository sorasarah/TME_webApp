from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from django.utils.crypto import get_random_string

class Command(BaseCommand):
    help = 'Ajoute des données de User à la base de données'
    
    def handle(self, *args, **kwargs):
        data = [
            {
                "username": "FishOcean",
                "password": "fishOcean123",
            }
        ]
        
        for user_data in data:       
            username = user_data['username']
            password = user_data['password']
            if not User.objects.filter(username=username).exists():
                user = User.objects.create_user(username=username, password=password)
                self.stdout.write(self.style.SUCCESS(f"User '{user.username}' ajouté à la base de données."))
            else:
                self.stdout.write(self.style.WARNING(f"User '{username}' existe déjà dans la base de données."))
        
        self.stdout.write(self.style.SUCCESS("Tous les users ont été ajoutés avec succès."))
