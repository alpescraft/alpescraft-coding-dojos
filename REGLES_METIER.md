# Règles Métier - Trivia

## Questions
- 50 questions par catégorie au démarrage
- 4 catégories : Pop, Science, Sports, Rock
- Questions en file FIFO (retirées après usage)

## Plateau
- 12 cases circulaires (0-11)
- Wrap-around : position > 11 revient au début (modulo 12)
- Catégories par position : Pop (0,4,8), Science (1,5,9), Sports (2,6,10), Rock (3,7,11)

## Dé & Déplacement
- Lancer de dé : 1 à 6 (équiprobable)
- Déplacement : avance du nombre de cases indiqué par le dé
- Déplacement vers l'avant uniquement

## Prison (Penalty Box)
- Entrée en prison : réponse incorrecte
- Lancer impair (1,3,5) : sort temporairement, se déplace, répond à une question
- Lancer pair (2,4,6) : reste bloqué, ne se déplace pas, pas de question

## Score & Victoire
- +1 pièce d'or par réponse correcte
- Condition de victoire : 6 pièces d'or
- Joueur en prison (sans sortie) : pas de gain possible

## Joueurs
- Nombre de joueurs : illimité
- Position initiale : case 0, 0 pièce, pas en prison
- Ordre des tours : ordre d'inscription, rotation circulaire
- Pas de validation sur les noms (doublons autorisés)
