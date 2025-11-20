# Historique de la session de coding dojo

## 1. Initialisation du projet Go

**Demande :** Créer un projet en langage Go et initialiser l'environnement.

**Réponse :**
- Installation de Go via Homebrew (`brew install go`) - Go 1.25.4
- Création du module Go (`go mod init github.com/xnopre/alpescraft-coding-dojos`)
- Création des fichiers de base :
  - `main.go` : Point d'entrée
  - `price_calculator.go` : Structure pour le calcul de prix
  - `price_calculator_test.go` : Tests unitaires

---

## 2. Explication des modules Go

**Demande :** C'est quoi un module en Go ?

**Réponse :**
- Un module Go est l'unité de base pour gérer les dépendances
- Défini par le fichier `go.mod` à la racine
- Contient le nom du module et la version de Go requise
- Équivalent à `package.json` (Node.js) ou `requirements.txt` (Python)

---

## 3. Création du Makefile

**Demande :** Mettre toutes les commandes utiles dans un fichier exécutable.

**Réponse :**
- Création d'un `Makefile` avec les commandes :
  - `make test` / `make test-v` : Lancer les tests
  - `make run` : Exécuter le programme
  - `make build` : Compiler
  - `make fmt` : Formater le code
  - `make vet` : Analyser le code
  - `make check` : Formater + analyser + tester
  - `make cover` : Rapport de couverture
  - `make clean` : Nettoyer
  - `make tidy` : Nettoyer les dépendances

---

## 4. Explication de la commande grep dans le Makefile

**Demande :** Expliquer la commande grep dans le fichier Makefile.

**Réponse :**
- La commande `grep -E '^[a-zA-Z_-]+:.*?## .*$$'` sert à auto-documenter le Makefile
- Elle recherche les lignes avec le pattern `target: ## Description`
- `awk` formate ensuite la sortie avec des couleurs
- Résultat : `make help` affiche toutes les commandes avec leur description

---

## 5. Implémentation TDD du calcul de prix

**Demande :** Implémenter le calcul de prix en TDD, cas par cas.

**Réponse :** Implémentation progressive :

### Test 1 : Sans taxe
- `3 articles × 1.21€ = 3.63€`
- Code : `total := quantity * unitPrice`

### Test 2 : Avec taxe 5%
- `3 × 1.21€ × 1.05 = 3.81€`
- Ajout : `totalWithTax := total * (1 + taxRate/100)`

### Test 3 : Avec taxe 20%
- `3 × 1.21€ × 1.20 = 4.36€`
- Le test passe directement (code déjà généralisé)

### Tests 4 & 5 : Avec remises
- Remise 3% si total ≥ 1000€
- Remise 5% si total ≥ 5000€
- Ajout de la logique de remise avec `if/else`

**Modification demandée :** Les taxes doivent être en pourcentage (5 au lieu de 0.05)

---

## 6. Clarification des noms de variables

**Demande :** Pourquoi les noms de variables ne sont pas clairs (lignes 22-29) ?

**Réponse :**
- `tt` est une convention Go pour "table test" mais peu explicite
- Renommé en `testCase` pour plus de clarté
- Discussion sur conventions vs clarté : dans un contexte pédagogique, la clarté prime

---

## 7. Explication des deux variables `t`

**Demande :** À quoi correspondent les variables `t` ligne 23 ?

**Réponse :**
- `t` #1 (extérieur) : paramètre de la fonction de test principale
- `t` #2 (intérieur) : paramètre de la fonction anonyme dans `t.Run()`
- C'est du "shadowing" : le `t` intérieur masque le `t` extérieur
- Les deux représentent un contexte de test `*testing.T` différent

---

## 8. Amélioration des messages d'erreur

**Demande :** Pourquoi le nom du test n'est pas affiché quand un test échoue ?

**Réponse :**
- Le nom est affiché dans `--- FAIL: TestName` mais pas dans le message d'erreur
- Amélioration du message d'erreur :
  - Avant : `Calculate() = 4.36 €, want 4.6 €`
  - Après : `[3 articles at 1.21€, 20% tax] Calculate(3, 1.21, 20%) = 4.36 €, want 4.6 €`

---

## 9. Lecture JSON et génération HTML

**Demande :** Modifier main.go pour lire les paramètres depuis `inputs.json` et écrire le résultat dans `output.html`.

**Réponse :**
- Modification de `main.go` :
  - Lecture du fichier JSON avec `os.ReadFile` et `json.Unmarshal`
  - Calcul des résultats pour chaque entrée
  - Génération d'un fichier HTML avec template Go
  - Tableau stylisé avec CSS intégré
- Création de `inputs.json` avec 5 exemples
- Mise à jour de `.gitignore` pour ignorer les fichiers générés
- Ajout au Makefile :
  - `make open` : Exécute et ouvre le HTML
  - `make clean-output` : Supprime les fichiers générés

---

## Fichiers créés/modifiés

| Fichier | Action |
|---------|--------|
| `go.mod` | Créé |
| `main.go` | Créé puis modifié |
| `price_calculator.go` | Créé |
| `price_calculator_test.go` | Créé puis modifié |
| `Makefile` | Créé puis modifié |
| `inputs.json` | Créé |
| `output.html` | Généré automatiquement |
| `.gitignore` | Modifié |
| `HISTORIQUE.md` | Créé |

---

## Commandes utiles

```bash
make test         # Lancer les tests
make test-v       # Tests en mode verbeux
make run          # Exécuter le programme (génère output.html)
make open         # Exécuter et ouvrir le HTML dans le navigateur
make check        # Formater, analyser et tester
make cover        # Rapport de couverture
make help         # Afficher toutes les commandes
```
