# The Greeting Kata

Source : https://github.com/karachi-katas/greeting-kata

Ce [Kata](https://en.wikipedia.org/wiki/Kata_(programming) est conçu pour aider à pratiquer ce à quoi un test d'une
fonction pure devrait ressembler. Il est intentionnellement conçu pour commencer par un cas de base très simple, sans
aucune branche, qui devient progressivement plus complexe avec l'ajout de nouvelles exigences nécessitant des branches
significatives et, finalement, une pression pour composer d'autres unités.

Ce Kata a été suggéré par [Nick Gauthier](http://ngauthier.com) et est en partie inspiré par Bob
de [Exercism](http://exercism.io).

Ce Kata est conçu pour être utilisé
avec [Detroit-school TDD](https://github.com/testdouble/contributing-tests/wiki/Detroit-school-TDD).

[Kata Source](https://github.com/testdouble/contributing-tests/wiki/Greeting-Kata)

## Exigence 1

Écrivez une méthode `greet(name)` qui insère `name` dans un message de salutation simple. Par exemple,
lorsque `name` vaut `"Bob"`, la méthode doit retourner la chaîne `"Bonjour Bob."`.

## Exigence 2

Gérez les valeurs nulles en introduisant un nom par défaut. Par exemple, lorsque `name` vaut `null`, la méthode doit
retourner la chaîne `"Bonjour mon ami."`.

## Exigence 3

Gérez les majuscules. Lorsque `name` est entièrement en majuscules, la méthode doit répondre également en
majuscules. Par exemple, lorsque `name` vaut `"JERRY"`, la méthode doit retourner la chaîne `"BONJOUR JERRY!"`.

## Exigence 4

Gérez deux noms comme entrée. Lorsque `name` est un tableau de deux noms (ou, dans les langages qui le supportent, des
arguments variables ou un "splat"), alors les deux noms doivent être inclus dans le message. Par exemple, lorsque `name`
vaut `["Jill", "Jane"]`, la méthode doit retourner la chaîne `"Bonjour Jill et Jane."`.

## Exigence 5

Gérez un nombre arbitraire de noms comme entrée. Lorsque `name` représente plus de deux noms, séparez-les par des
virgules, et terminez avec un "et" (sans virgule). Par exemple, lorsque `name` vaut
`["Amy", "Brian", "Charlotte"]`, la méthode doit retourner la chaîne `"Bonjour Amy, Brian et Charlotte."`.

## Exigence 6

Permettez un mélange de noms normaux et en majuscules en séparant la réponse en deux salutations. Par exemple, lorsque
`name` vaut `["Amy", "BRIAN", "Charlotte"]`, la méthode doit retourner la chaîne `"Bonjour Amy and Charlotte. AND BONJOUR
BRIAN!"`.

## Exigence 7

Si une entrée dans `name` est une chaîne contenant une virgule, divisez-la en plusieurs entrées. Par exemple,
lorsque `name` vaut `["Bob", "Charlie, Dianne"]`, la méthode doit retourner la chaîne `"Bonjour Bob, Charlie et Dianne."`.

## Exigence 8

Permettez à l'entrée d'échapper les virgules intentionnelles ajoutées dans l'Exigence 7. Cela peut être fait de la même
manière que dans un fichier CSV, en entourant l'entrée de guillemets doubles. Par exemple, lorsque `name`
vaut `["Bob", "\"Charlie, Dianne\""]`, la méthode doit retourner la chaîne `"Bonjour Bob et Charlie, Dianne."`.
