import matplotlib.pyplot as plt

# Données
annees = [2019, 2020, 2021, 2022, 2023]  # Années
resultat_comptable = [50000, 60000, 70000, 80000, 90000]  # Résultat comptable pour chaque année
montant_impot = [15000, 18000, 21000, 24000, 27000]  # Montant d'impôt à prévoir pour chaque année

# Création du graphique
plt.figure(figsize=(10, 6))

# Barres pour le résultat comptable
plt.bar(annees, resultat_comptable, color='blue', label='Résultat comptable')

# Barres pour le montant d'impôt
plt.bar(annees, montant_impot, color='red', label='Montant d\'impôt')

# Ajout de titres et d'étiquettes
plt.xlabel('Année')
plt.ylabel('Montant (en euros)')
plt.title('Résultat comptable et montant d\'impôt par année')
plt.legend()

# Affichage du graphique
plt.grid(True)
plt.tight_layout()
plt.show()
