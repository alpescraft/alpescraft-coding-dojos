> Séance du 02/12/2025

# Suite de Conway

## Objectif du kata

Développer l'algorithme qui permte de passer d'un terme de la suite de Conway au suivant.

## Principe de la suite de Conway

Le premier terme de la suite de Conway est posé comme égal à "1". Chaque terme de la suite se construit en décrivant
le terme précédent, c'est-à-dire en énonçant le nombre de fois où chaque chiffre est répété,
suivi du chiffre en question.

Concrètement :

`X0 = 1`

Ce terme comporte simplement un « 1 ». Par conséquent, le terme suivant est :

`X1 = 11`

Celui-ci est composé de deux « 1 » :

`X2 = 21`

En poursuivant le procédé :

```
X3 = 12 11
X4 = 11 12 21
X5 = 31 22 11
X6 = 13 11 22 21
```

# Idées évoquées pour ce kata

- Utiliser la récursivité
