
import {describe, expect, it, beforeEach} from 'bun:test';
import {GameRunner} from '../src/game-runner';
import {Game} from '../src/game';


describe('Game - Règles Métier', () => {
    let game: Game;

    beforeEach(() => {
        game = new Game();
        // Mock console.log pour éviter la pollution des logs pendant les tests
        global.console.log = () => {};
    });

    // TEST 1 : ✅ Initialisation correcte du premier joueur
    it('should correctly initialize first player at position 0 with 0 gold coins', () => {
        game.add('Alice');
        
        const players = (game as any).players;
        
        expect(players.length).toBe(1);
        expect(players[0].name).toBe('Alice');
        expect(players[0].position).toBe(0);
        expect(players[0].goldCoins).toBe(0);
        expect(players[0].inPenaltyBox).toBe(false);
    });

    // TEST 2 : ✅ Ajout de plusieurs joueurs
    it('should add multiple players with correct initial state', () => {
        game.add('Alice');
        game.add('Bob');
        game.add('Charlie');
        
        const players = (game as any).players;
        
        expect(players.length).toBe(3);
        expect(players[0].name).toBe('Alice');
        expect(players[1].name).toBe('Bob');
        expect(players[2].name).toBe('Charlie');
        
        // Tous les joueurs devraient commencer à la position 0 avec 0 pièces
        expect(players[0].position).toBe(0);
        expect(players[0].goldCoins).toBe(0);
        expect(players[1].position).toBe(0);
        expect(players[1].goldCoins).toBe(0);
        expect(players[2].position).toBe(0);
        expect(players[2].goldCoins).toBe(0);
    });

    // TEST 3 : ✅ Déplacement avec wrap-around (modulo 12)
    it('should wrap around the board when position exceeds 11 (modulo 12)', () => {
        game.add('Alice');
        
        const players = (game as any).players;
        
        // Forcer la position à 10
        players[0].position = 10;
        
        // Lancer 5 : devrait arriver à position 3 (10+5) % 12 = 3
        game.roll(5);
        
        expect(players[0].position).toBe(3);
    });

    // TEST 4 : ✅ Catégories par position selon les règles métier
    it('should return correct category based on position (Pop: 0,4,8 / Science: 1,5,9 / Sports: 2,6,10 / Rock: 3,7,11)', () => {
        game.add('Alice');
        
        const players = (game as any).players;
        
        // Tester les catégories Pop (positions 0, 4, 8)
        players[0].position = 0;
        expect((game as any).currentCategory()).toBe('Pop');
        players[0].position = 4;
        expect((game as any).currentCategory()).toBe('Pop');
        players[0].position = 8;
        expect((game as any).currentCategory()).toBe('Pop');
        
        // Tester les catégories Science (positions 1, 5, 9)
        players[0].position = 1;
        expect((game as any).currentCategory()).toBe('Science');
        players[0].position = 5;
        expect((game as any).currentCategory()).toBe('Science');
        players[0].position = 9;
        expect((game as any).currentCategory()).toBe('Science');
        
        // Tester les catégories Sports (positions 2, 6, 10)
        players[0].position = 2;
        expect((game as any).currentCategory()).toBe('Sports');
        players[0].position = 6;
        expect((game as any).currentCategory()).toBe('Sports');
        players[0].position = 10;
        expect((game as any).currentCategory()).toBe('Sports');
        
        // Tester les catégories Rock (positions 3, 7, 11)
        players[0].position = 3;
        expect((game as any).currentCategory()).toBe('Rock');
        players[0].position = 7;
        expect((game as any).currentCategory()).toBe('Rock');
        players[0].position = 11;
        expect((game as any).currentCategory()).toBe('Rock');
    });

    // TEST 5 : ✅ Entrée en prison après réponse incorrecte
    it('should send player to penalty box on wrong answer', () => {
        game.add('Alice');
        game.add('Bob');
        
        const players = (game as any).players;
        
        expect(players[0].inPenaltyBox).toBe(false);
        
        game.wrongAnswer();
        
        expect(players[0].inPenaltyBox).toBe(true);
    });

    // TEST 6 : ✅ Sortie de prison avec lancer impair
    it('should get out of penalty box temporarily with odd roll (1,3,5)', () => {
        game.add('Alice');
        
        const players = (game as any).players;
        
        // Mettre le joueur en prison
        players[0].inPenaltyBox = true;
        players[0].position = 5;
        
        // Lancer impair (3)
        game.roll(3);
        
        const isGettingOut = (game as any).isGettingOutOfPenaltyBox;
        
        expect(isGettingOut).toBe(true);
        expect(players[0].position).toBe(8);  // (5 + 3) % 12 = 8
    });

    // TEST 7 : ✅ Blocage en prison avec lancer pair
    it('should stay in penalty box with even roll (2,4,6)', () => {
        game.add('Alice');
        
        const players = (game as any).players;
        
        // Mettre le joueur en prison
        players[0].inPenaltyBox = true;
        const initialPosition = 5;
        players[0].position = initialPosition;
        
        // Lancer pair (4)
        game.roll(4);
        
        const isGettingOut = (game as any).isGettingOutOfPenaltyBox;
        
        expect(isGettingOut).toBe(false);
        expect(players[0].position).toBe(initialPosition);  // Position inchangée
    });

    // TEST 8 : ✅ Incrémentation du score
    it('should increment gold coins by 1 on correct answer', () => {
        game.add('Alice');
        
        const players = (game as any).players;
        
        expect(players[0].goldCoins).toBe(0);
        
        game.wasCorrectlyAnswered();
        
        expect(players[0].goldCoins).toBe(1);
    });

    // TEST 9 : ✅ Condition de victoire (6 pièces d'or) - BUG CORRIGÉ
    it('should detect victory when player has 6 gold coins', () => {
        game.add('Alice');
        
        const players = (game as any).players;
        
        // Donner 6 pièces d'or au joueur
        players[0].goldCoins = 6;
        
        const didWin = (game as any).didPlayerWin();
        
        // Comportement attendu après correction : retourne true quand le joueur a 6 pièces
        expect(didWin).toBe(true);
    });

    // TEST 10 : ✅ Rotation des joueurs
    it('should rotate players in circular order (0 -> 1 -> 2 -> 0)', () => {
        game.add('Alice');
        game.add('Bob');
        game.add('Charlie');
        
        const currentPlayerIndex = (game as any).currentPlayerIndex;
        expect(currentPlayerIndex).toBe(0);  // Alice
        
        game.wasCorrectlyAnswered();
        expect((game as any).currentPlayerIndex).toBe(1);  // Bob
        
        game.wasCorrectlyAnswered();
        expect((game as any).currentPlayerIndex).toBe(2);  // Charlie
        
        game.wasCorrectlyAnswered();
        expect((game as any).currentPlayerIndex).toBe(0);  // Alice (rotation)
    });
});
