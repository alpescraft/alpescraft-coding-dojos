> Séance du 30/10/2025

# Roman numerals

Convertir dees nombres arabes en nombre romains :

```text
   1 --> I
   2 --> II
   4 --> IV
   7 --> VII
  10 --> X
  50 --> L
 100 --> C
 500 --> D
1000 --> M
```

## Variante

Convertir dans l'autre sens.

# Résumé de la séance

Nous nous sommes arrêtés après avoir mis de côté le cas du "4" pour mettre en place
une `Map` avec les seuils et leurs symboles, et un algorithme générique permettant
de les exploiter et les cumuler.

Reste à voir le cas du "4" et plus généralement les cas où il faut précédent un symbole
par un autre pour faire une soustraction.