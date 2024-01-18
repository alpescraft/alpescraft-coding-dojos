# Séance du 18/01/2024

# Kata : Calcul de prix

Implémenter le calcul du prix total à partir des paramètres suivants :
* Nombre d'articles
* Prix unitaire
* Tax

Prendre en compte des réductions :
* 1000 € : remise de 3%
* 5000 € : remise de 5%

## Exemples

* HT : 3 articles à 1,21 € + 0 % ⇒ “3.63 €”
* TTC 5% : 3 articles à 1,21 €  + 5 % ⇒ “3.81 €”
* TTC 20%: 3 articles à 1,21 €  +20 % ⇒ “4.36 €”
* Réductions :
    * 1000 € → Remise 3% : 5 x 345,00 € + taxe 10% → “1840.58 €”
    * 5000 € → Remise 5% : 5 x 1299,00 € + taxe 10% → “6787.28 €”