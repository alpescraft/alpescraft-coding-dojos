# Évaluation Qualité du Code - Trivia

**Évaluateur** : Senior Développeur  
**Date** : 24 février 2026  
**Codebase** : TypeScript Trivia (207 lignes)

---

## Note Globale : 2/10 ⚠️

**Verdict** : Code Legacy de très mauvaise qualité nécessitant un refactoring complet.

---

## 1. Analyse par Catégorie

### 1.1 Lisibilité : 3/10 ⚠️

#### Points Négatifs
- **Indentation incohérente** (lignes 49-76, 127-164)
- **Noms de variables cryptiques** : `purses` au lieu de `goldCoins`
- **Duplication de code massive** (lignes 54-57 ≈ 68-71, lignes 136-138 ≈ 142-144 ≈ 159-161)
- **Méthodes trop longues** : `wasCorrectlyAnswered()` (38 lignes), `roll()` (32 lignes)
- **Imbrication excessive** : 3-4 niveaux de profondeur

#### Points Positifs
- Noms de classes clairs (`Game`, `GameRunner`)
- Utilisation de TypeScript avec typage

### 1.2 Maintenabilité : 1/10 🔴

#### Points Critiques
- **God Class** : Toute la logique dans une seule classe (Game)
- **Violation SRP** : Game gère affichage, logique métier, état
- **Couplage fort** : Console.log mélangé à la logique métier
- **Pas de séparation des responsabilités**
- **Modification = cascade de bugs** (tableaux non synchronisés)

#### Code Smells Majeurs
```typescript
// BUG CRITIQUE src/game.ts:31-33
this.places[this.howManyPlayers()] = 0;  // Off-by-one error!
this.purses[this.howManyPlayers()] = 0;  // players.length déjà incrémenté
this.inPenaltyBox[this.howManyPlayers()] = false;
```

### 1.3 Testabilité : 1/10 🔴

#### Problèmes
- **Tests inexistants** : Seulement 2 tests triviaux (expect(true).toBe(true))
- **Couverture : ~0%** des règles métier testées
- **Code non testable** : console.log imbriqué partout
- **Pas de mocks possibles** : logique et affichage couplés
- **Randomness non injectable** : Math.random() en dur

#### Tests Actuels
```typescript
it('should pass', () => {
    expect(true).toBe(true);  // Test inutile
});
```

### 1.4 Performance : 5/10 🟡

#### Points Positifs
- Complexité acceptable pour un petit jeu
- Pas de problèmes majeurs de performance

#### Points d'Amélioration
- `.shift()` sur tableaux (O(n)) au lieu de pointeurs (O(1))
- Recalcul répétitif de `currentCategory()` (lignes 80-87)

### 1.5 Sécurité : 3/10 ⚠️

#### Vulnérabilités
- **Aucune validation des entrées** : `add()` accepte n'importe quoi
- **Array bounds non vérifiés** : crash si questions épuisées
- **État corruptible** : arrays peuvent être désynchronisés
- **Pas de gestion d'erreurs**

---

## 2. Bugs Critiques Identifiés

### 🔴 BUG #1 : Off-by-One Error (src/game.ts:31-33)
```typescript
public add(name: string): boolean {
    this.players.push(name);           // length = 1
    this.places[this.howManyPlayers()] = 0;  // places[1] au lieu de places[0] !
    this.purses[this.howManyPlayers()] = 0;  // purses[1] au lieu de purses[0] !
    this.inPenaltyBox[this.howManyPlayers()] = 0;
}
```
**Impact** : Premier joueur a position et coins = `undefined` → NaN
**Preuve** : Output test montre "Chet now has NaN Gold Coins"

### 🔴 BUG #2 : Logique de Victoire Inversée (src/game.ts:113)
```typescript
private didPlayerWin(): boolean {
    return !(this.purses[this.currentPlayer] == 6)  // Retourne FALSE si victoire !
}
```
**Impact** : Logique contre-intuitive, difficile à maintenir

### 🟡 BUG #3 : Typo (src/game.ts:151)
```typescript
console.log("Answer was corrent!!!!");  // "corrent" au lieu de "correct"
```

### 🟡 BUG #4 : Questions Épuisées (src/game.ts:81)
```typescript
console.log(this.popQuestions.shift());  // undefined après 50 questions
```
**Impact** : Affiche "undefined" après 50 questions Pop

---

## 3. Code Smells (Anti-Patterns)

### 3.1 Duplication de Code (DRY Violation)

**Exemple 1 : Modulo 12 répété**
```typescript
// Lignes 54-57
if (this.places[this.currentPlayer] > 11) {
    this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
}

// Lignes 68-71 (EXACTEMENT LE MÊME CODE)
if (this.places[this.currentPlayer] > 11) {
    this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
}
```
**Solution** : Extraire en `movePlayer(steps: number)`

**Exemple 2 : Rotation du joueur courant (3 fois)**
```typescript
// Lignes 121-123, 136-138, 142-144, 159-161
this.currentPlayer += 1;
if (this.currentPlayer == this.players.length)
    this.currentPlayer = 0;
```
**Solution** : Extraire en `nextPlayer()`

### 3.2 Méthode Trop Longue

**`currentCategory()` : 20 lignes de if statements**
```typescript
if (this.places[this.currentPlayer] == 0) return 'Pop';
if (this.places[this.currentPlayer] == 4) return 'Pop';
if (this.places[this.currentPlayer] == 8) return 'Pop';
// ... 17 lignes de plus
```
**Solution** : Utiliser modulo ou Map
```typescript
private readonly CATEGORIES = ['Pop', 'Science', 'Sports', 'Rock'];
return this.CATEGORIES[this.places[this.currentPlayer] % 4];
```

### 3.3 Magic Numbers

- `50` (nombre de questions) - devrait être constante
- `6` (victoire) - devrait être configurable
- `12` (taille plateau) - devrait être constante
- `7` (probabilité réponse incorrecte) - devrait être explicite

### 3.4 God Class

La classe `Game` fait TOUT :
- Gestion de l'état
- Logique métier
- Affichage console
- Validation (inexistante)
- Orchestration

**Solution** : Séparer en plusieurs classes (Player, Board, QuestionBank, GameEngine, ConsoleRenderer)

### 3.5 Feature Envy

```typescript
this.players[this.currentPlayer]
this.places[this.currentPlayer]
this.purses[this.currentPlayer]
this.inPenaltyBox[this.currentPlayer]
```
Répété 30+ fois → Devrait être un objet `Player`

---

## 4. Violations des Principes SOLID

### ❌ Single Responsibility Principle (SRP)
`Game` gère : état, logique, affichage, questions

### ❌ Open/Closed Principle (OCP)
Impossible d'ajouter une catégorie sans modifier `currentCategory()`

### ✅ Liskov Substitution (LSP)
N/A (pas d'héritage)

### ❌ Interface Segregation (ISP)
Pas d'interfaces définies

### ❌ Dependency Inversion (DIP)
Dépendance directe à `console.log`, pas d'injection

---

## 5. Problèmes d'Architecture

### 5.1 Absence de Structure
```
src/
  ├── game.ts           (168 lignes - TOUT)
  └── game-runner.ts    (27 lignes)
```

**Architecture Attendue** :
```
src/
  ├── models/
  │   ├── Player.ts
  │   ├── Board.ts
  │   └── Question.ts
  ├── services/
  │   ├── GameEngine.ts
  │   ├── QuestionBank.ts
  │   └── ScoreManager.ts
  ├── interfaces/
  │   └── IRenderer.ts
  ├── renderers/
  │   └── ConsoleRenderer.ts
  └── game-runner.ts
```

### 5.2 Couplage Console
Impossible de :
- Créer une UI graphique
- Tester sans pollution console
- Utiliser dans un contexte web

### 5.3 État Mutable Non Encapsulé
Arrays publiques (via index) → risque de corruption

---

## 6. Qualité des Tests

### Couverture Actuelle : 0% 🔴

**Tests existants** :
```typescript
it('should pass', () => {
    expect(true).toBe(true);  // Inutile
});

it("should access game", function () {
    expect(GameRunner).toBeDefined();  // Trivial
});
```

### Tests Manquants Critiques
- ✗ Test de l'ajout de joueur
- ✗ Test du déplacement (modulo 12)
- ✗ Test de la prison (impair/pair)
- ✗ Test du score
- ✗ Test de la condition de victoire
- ✗ Test des catégories
- ✗ Test des questions
- ✗ Test de rotation des joueurs
- ✗ Tests de cas limites (0 joueur, 100 joueurs, questions épuisées)

### Problème de Testabilité
```typescript
// IMPOSSIBLE à tester sans voir le console.log
public roll(roll: number) {
    console.log(...);  // Couplage fort
    // logique métier mélangée
}
```

---

## 7. Bonnes Pratiques Non Respectées

### ❌ Clean Code
- Méthodes > 20 lignes (max recommandé : 10-15)
- Cyclomatic complexity élevée
- Commentaires absents
- Magie numbers partout

### ❌ Design Patterns
- Aucun pattern utilisé (Strategy, State, Observer, etc.)
- Procédural déguisé en OOP

### ❌ Error Handling
- Aucun try/catch
- Aucune validation
- Pas de gestion des cas limites

### ❌ Documentation
- Pas de JSDoc
- Pas de README technique
- Pas de commentaires explicatifs

### ❌ Configuration
- Valeurs en dur (50 questions, 6 victoire, etc.)
- Pas de fichier de config

---

## 8. Points Positifs (Rares)

### ✅ TypeScript
- Utilisation de types
- Classes au lieu de fonctions globales

### ✅ Simplicité
- Pas de sur-ingénierie
- Logique métier compréhensible

### ✅ Fonctionnel
- Le jeu fonctionne (malgré les bugs)

---

## 9. Recommandations par Priorité

### 🔴 PRIORITÉ CRITIQUE (À faire immédiatement)

1. **Corriger le bug off-by-one** (src/game.ts:31-33)
   ```typescript
   const playerIndex = this.players.length - 1;
   this.places[playerIndex] = 0;
   this.purses[playerIndex] = 0;
   this.inPenaltyBox[playerIndex] = false;
   ```

2. **Ajouter des tests unitaires de base**
   - Tester l'ajout de joueurs
   - Tester les déplacements
   - Tester la prison
   - Tester la victoire

3. **Séparer affichage et logique métier**
   - Créer interface `IRenderer`
   - Extraire tous les `console.log`
   - Injecter le renderer

### 🟡 PRIORITÉ HAUTE (Sprint suivant)

4. **Refactoring : Extraire classe Player**
   ```typescript
   class Player {
       constructor(
           public name: string,
           private position: number = 0,
           private goldCoins: number = 0,
           private inPenaltyBox: boolean = false
       ) {}
   }
   ```

5. **Éliminer la duplication**
   - Extraire `movePlayer(steps: number)`
   - Extraire `nextPlayer()`
   - Simplifier `currentCategory()` avec modulo

6. **Ajouter validation**
   - Nom de joueur non vide
   - Minimum 2 joueurs
   - Dé entre 1-6

### 🟢 PRIORITÉ MOYENNE (Backlog)

7. **Refactoring architectural complet**
   - Séparer en modules (models, services, renderers)
   - Implémenter les patterns appropriés
   - Ajouter injection de dépendances

8. **Améliorer les tests**
   - Couverture > 80%
   - Tests d'intégration
   - Tests de cas limites

9. **Documentation**
   - JSDoc sur toutes les méthodes publiques
   - README technique
   - Guide de contribution

10. **Configuration**
    - Externaliser les constantes
    - Fichier de config JSON/ENV
    - Paramètres de jeu modifiables

---

## 10. Estimation de la Dette Technique

### Temps de Refactoring Estimé

| Tâche | Temps | Difficulté |
|-------|-------|------------|
| Corriger bugs critiques | 2h | Facile |
| Ajouter tests de base | 4h | Moyen |
| Séparer affichage/logique | 6h | Moyen |
| Extraire classe Player | 4h | Moyen |
| Éliminer duplication | 3h | Facile |
| Refactoring architectural | 16h | Difficile |
| Tests complets (>80%) | 8h | Moyen |
| Documentation | 4h | Facile |
| **TOTAL** | **47h** | **~6 jours** |

### Risque de Non-Refactoring

- 🔴 **Bugs en production** : off-by-one crash le jeu
- 🔴 **Impossibilité d'évolution** : Ajouter features = chaos
- 🟡 **Onboarding difficile** : Nouveaux dev perdus
- 🟡 **Maintenance coûteuse** : Chaque bug = investigation longue

---

## 11. Comparaison Avant/Après (Proposition)

### Architecture Actuelle
```
Game (God Class)
  ├─ État (4 arrays)
  ├─ Logique métier
  ├─ Affichage console
  └─ Questions
```

### Architecture Proposée
```
GameEngine
  ├─ Players: Player[]
  ├─ Board
  ├─ QuestionBank
  ├─ ScoreManager
  └─ IRenderer (injectable)
```

### Code Actuel vs Proposé

**Avant (currentCategory)** :
```typescript
private currentCategory(): string {
    if (this.places[this.currentPlayer] == 0) return 'Pop';
    if (this.places[this.currentPlayer] == 4) return 'Pop';
    if (this.places[this.currentPlayer] == 8) return 'Pop';
    // ... 17 lignes de plus
    return 'Rock';
}
```

**Après** :
```typescript
private readonly CATEGORIES = ['Pop', 'Science', 'Sports', 'Rock'];

private currentCategory(): string {
    return this.CATEGORIES[this.currentPlayer.position % 4];
}
```

---

## 12. Checklist de Qualité

### Code Quality
- [ ] Pas de duplication (DRY)
- [ ] Méthodes < 15 lignes
- [ ] Cyclomatic complexity < 10
- [ ] Noms explicites
- [ ] Commentaires pertinents
- [ ] Pas de magic numbers

### Architecture
- [ ] Séparation des responsabilités (SRP)
- [ ] Couplage faible
- [ ] Cohésion forte
- [ ] Patterns appropriés
- [ ] Injection de dépendances

### Tests
- [ ] Couverture > 80%
- [ ] Tests unitaires
- [ ] Tests d'intégration
- [ ] Tests de cas limites
- [ ] Tests lisibles (AAA pattern)

### Sécurité
- [ ] Validation des entrées
- [ ] Gestion d'erreurs
- [ ] Pas de failles évidentes
- [ ] Données encapsulées

### Documentation
- [ ] JSDoc/TSDoc
- [ ] README à jour
- [ ] Exemples d'usage
- [ ] Architecture documentée

**Score Actuel : 2/25 items ✅**

---

## Conclusion

### 🔴 État Actuel : CODE LEGACY PROBLÉMATIQUE

**Points Forts** :
- Fonctionne (avec bugs)
- TypeScript utilisé
- Logique métier simple

**Points Faibles** :
- Bugs critiques (off-by-one, NaN)
- 0% de tests utiles
- Duplication massive
- God Class
- Aucune séparation des responsabilités
- Impossible à maintenir/étendre

### 🎯 Recommandation Finale

**Ce code est un excellent kata de refactoring**, mais **ne devrait JAMAIS aller en production** dans cet état.

**Actions Immédiates** :
1. ✅ Corriger le bug off-by-one (CRITIQUE)
2. ✅ Écrire des tests (bloquant)
3. ✅ Séparer affichage/logique (bloquant)

**Après refactoring** (47h estimées), ce code pourrait atteindre **7-8/10**.

---

**Document généré par** : Senior Developer Code Review  
**Méthodologie** : Clean Code, SOLID, Design Patterns, Best Practices  
**Outils** : Analyse manuelle, Exécution tests, Inspection statique
