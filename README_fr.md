## Kata Parallel Change

### Qu'est-ce que le Parallel Change ?

Aussi connu sous le nom d'Expand and Contract, c'est un pattern qui peut être utilisé pour faire évoluer une conception logicielle en introduisant des changements rétrocompatibles sans casser les clients du code existant. Il implique trois étapes :

1. expand (ajouter le nouvel élément - classe, méthode, variable) ;
2. migrate (migrer les clients de l'élément existant pour utiliser le nouveau introduit à l'étape 1) ; et
3. contract (supprimer l'ancien élément - classe, méthode, variable)

Une discussion plus détaillée, avec des exemples, peut être trouvée dans
[l'article de Danilo Sato sur le Parallel Change](https://martinfowler.com/bliki/ParallelChange.html).

## Votre tâche
En utilisant le Parallel Change, modifiez la classe `ShoppingCart` pour gérer plusieurs articles au lieu d'un seul.
Les tests ont déjà été écrits.

## Règles
Les tests ne doivent jamais être en rouge. Pas d'erreurs de compilation, pas d'échecs. (La seule exception est pendant quelques secondes pendant que vous écrivez une seule ligne de code.)
