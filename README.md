# Kotlin Coroutines Kata

En tant que développeur frontend, 
j'ai pour tâche de mettre en place une couche d'accès a une API 
afin d'afficher à l'utilisateur les informations d'un magasin et de ses produits.

## Contexte

Voici une représentation des produits du magasin en JSON:

```json
{
  "products": [
    {
      "id": 1,
      "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      "price": 109.95,
      "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      "category": "men's clothing",
      "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      "rating": {
        "rate": 3.9,
        "count": 120
      }
    }
  ],
  "_comment": "More products here..."
}
```

> Par simplicité, leur représentation en `data class` Kotlin est disponible dans le fichier `src/main/kotlin/Store`: 

**Notre objectif** est donc d'implementer l'interface suivante afin de réaliser nos appels à l'API et de les tester.

```kotlin
interface StoreService {
    suspend fun getProducts(withRate: Double? = null) : List<Product>
    fun getProductsAsFlow(withRate: Double? = null) : Flow<Product>
}
```

> NB : Un service à besoin d'une URL de base non vide et d'un client HTTP
>
> ```kotlin
> // Tips : regex simple de controle d'url de base
> """([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?"""
> ```

## Tips and Tricks

### Fake it until you make it

Un fichier JSON contenant un jeu de données de test est disponible, 
il serait intwressant de créer un outil pour le lire pour nos tests.

> La lecture d'un fichier de ressources se fait de la manière suivante
> ```kotlin
> val file = MyClass::class.java.getResource("/res.file")
> ```

Pour décoder du JSON en utilisant KotlinX Serialization il faut annoter les types de destination avec `@Serializable`. 

> Il ne reste plus qu'a lire le fichier en le déserialisant:
> ```kotlin
> Json.decodeFromString<MyEntity>(file.readText())
> ```

### Ktor's HTTP Client and mocking

Afin de faire des appels HTTP on peut utiliser la lib Ktor, qui offre une API de test très simple.

```kotlin
val client = HttpClient {
    install(ContentNegotiation) { Json }
}
// ou
val client = HttpClient(HttpEngine) {
    install(ContentNegotiation) { Json }
}
```

Afin de mocker des réponse HTTP on utilise un `Engine` de type `MockEngine`.

```kotlin
val mockOk = MockEngine {
    respond(
        content = ByteReadChannel("""{"ip":"127.0.0.1"}"""),
        status = HttpStatusCode.OK,
        headers = headersOf(HttpHeaders.ContentType, "application/json")
    )
}
// Mais aussi
val mockFail = MockEngine {
    respond(
        content = ByteReadChannel.Empty,
        status = HttpStatusCode.Forbidden,
    )
}

```
