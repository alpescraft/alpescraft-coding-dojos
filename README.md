# Kotlin Coroutines Kata - Part 2

En tant que développeur frontend,
j'ai pour tâche de mettre en place une couche d'accès a une API
afin d'afficher à l'utilisateur les informations d'un magasin et de ses produits.

## Contexte

Nous avons besoin de récupérer les informations d'un magasin et de ses produits, avec leur prix et leur stock.

Voici une représentation des produits en JSON:

```json
[
  { "id": 1, "description": "Apples", "type": "fruit" },
  { "id": 2, "description": "Bananas", "type": "fruit" },
  { "id": 3, "description": "Carrots", "type": "vegetable" },
  { "id": 4, "description": "Dates", "type": "fruit" },
  { "id": 5, "description": "Eggplants", "type": "vegetable" }
  // ...
]
```

De même pour les prix:

```json
[
  { "id": 1, "value": 1.99 },
  { "id": 2, "value": 0.99 },
  { "id": 3, "value": 0.79 },
  { "id": 4, "value": 2.99 },
  { "id": 5, "value": 1.49 }
  // ...
]
```

Et pour le stock:

```json
[
  { "id": 1, "quantity": 43 },
  { "id": 2, "quantity": 72 },
  { "id": 3, "quantity": 91 },
  { "id": 4, "quantity": 12 },
  { "id": 5, "quantity": 64 }
  // ...
]
```

> Par simplicité, leur représentation en `data class` Kotlin est disponible dans le fichier `src/main/kotlin/Products.kt`

> Nous avons également une API qui nous permet de récupérer ces informations, disponible dans le fichier `src/main/kotlin/ProductService.kt` avec une fausse implémentation pour nos tests.
> ```kotlin
> interface ProductService {
>   suspend fun getProducts(): List<Product>
>   suspend fun getPriceByProductId(productId: Int): ProductPrice?
>   suspend fun getStockByProductId(productId: Int): ProductStock?
> }
> ```

## Étape 1: Créer un cache mémoire des produits

Notre première étape va être de faire appel à l'API pour récupérer les produits et de les stocker dans un cache mémoire.

Avec les coroutines nous pouvons utiliser un `StateFlow/SharedFlow` pour exposer un flux de données observable.

```kotlin
private val _state = MutableStateFlow(0) // Crée un MutableStateFlow avec une valeur initiale de 0
public val state = _state.asStateFlow() // Expose le MutableStateFlow en tant que StateFlow
state.update { it + 1 } // Met à jour la valeur de l'état
state.collect { println(it) } // Affiche la valeur de l'état
```

1. Créez un cache mémoire observable pour les produits
2. Créez une fonction pour récupérer les produits par type

## Étape 2: Récupérer le détails des produits

Pour notre application de Drive nous avons besoin de récupérer les produits, les prix et leur quantité en stock.
Nous aimerions pouvoir récupérer ces informations sous forme d'un flux de données observable.

```kotlin
val data = flow {
    emit(1)
    emit(2)
    emit(3)
}
data.collect { println(it) } 
// Affiche 1
// Affiche 2
// Affiche 3
```

Pour récupérer des données de manière asynchrone, nous pouvons utiliser la fonction `async`.

```kotlin
val deferredValue1 = async { 21 }
val deferredValue2 = async { 21 }
val result = deferredValue1.await() + deferredValue2.await()
```

## Tips & Tricks

Pour tester le résultat d'un `Flow` vous pouvez utiliser la fonction `test` de la librairie `turbine`.

```kotlin
val data = flowOf(1, 2, 3)
data.test {
    assertEquals(1, expectItem())
    assertEquals(2, expectItem())
    assertEquals(3, expectItem())
    expectComplete()
}
```
