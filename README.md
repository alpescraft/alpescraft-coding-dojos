> AlpesCraft Coding-dojo "Grenoble centre"

# Séance du 13/02/2026

Objectif : explorer le refactoring avec l'IA (avec Claude Code)

Sujet/kata : [Refactoring-Kata-Lift-Pass-Pricing](https://github.com/martinsson/Refactoring-Kata-Lift-Pass-Pricing)

# Notes sommaires sur le déroulé de la session

* Commande `/init` pour initialiser un fichier [./CLAUDE.md](./CLAUDE.md)
* Correction du test existant pour qu'il soit correct (`body.cost`) tout en gardant la vérification de la valeur `35`
  * Discussion pour savoir si on garde ce test, si on lui fait confiance, ...
* Génération du fichier [rules.md](./rules.md) avec les règles métier
* Recherche d'éventuels bugs, 3 bugs trouvé par l'IA : 
  * Monday discount non appliqué aux seniors (65+)
  * Monday discount non appliqué aux adultes (15-64)
  * Monday discount non appliqué aux enfants (6-14)
* Grosse discussion pour savoir comment continuer : 
  * Corriger les bugs ? 
  * Ajouter des tests selon la logique (buggée) actuelle, donc tests qui passent
  * Ajouter des tests selon les "bonnes" règles métier et avoir des tests qui ne passent pas
* Génération des tests selon la logique actuelle, tests qui passent
* Demande à l'IA de refactorer mais elle génère un plan avec les points suivants qui ne conviennent pas :
  * Correction des bugs
  * Implémentation du calcul de plusieurs tarifs (objectif initial du kata)

➡️ Stop de l'assistant IA et fin de la session