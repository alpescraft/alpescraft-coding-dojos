type Category = 'Pop' | 'Science' | 'Sports' | 'Rock';

interface Player {
    name: string;
    position: number;
    goldCoins: number;
    inPenaltyBox: boolean;
}

export class Game {
    private static readonly CATEGORIES: readonly Category[] = ['Pop', 'Science', 'Sports', 'Rock'];
    private static readonly QUESTIONS_PER_CATEGORY = 50;
    private static readonly BOARD_SIZE = 12;
    private static readonly WINNING_COINS = 6;

    private players: Player[] = [];
    private currentPlayerIndex: number = 0;
    private isGettingOutOfPenaltyBox: boolean = false;
    private questions: Record<Category, string[]> = {
        Pop: [],
        Science: [],
        Sports: [],
        Rock: []
    };

    constructor() {
        Game.CATEGORIES.forEach(category => {
            for (let i = 0; i < Game.QUESTIONS_PER_CATEGORY; i++) {
                this.questions[category].push(`${category} Question ${i}`);
            }
        });
    }

    public add(name: string): boolean {
        const newPlayer: Player = {
            name,
            position: 0,
            goldCoins: 0,
            inPenaltyBox: false
        };
        
        this.players.push(newPlayer);

        console.log(`${name} was added`);
        console.log(`They are player number ${this.players.length}`);

        return true;
    }

    public roll(roll: number): void {
        const player = this.getCurrentPlayer();
        
        console.log(`${player.name} is the current player`);
        console.log(`They have rolled a ${roll}`);

        if (player.inPenaltyBox) {
            this.handlePenaltyBoxRoll(player, roll);
        } else {
            this.handleNormalRoll(player, roll);
        }
    }

    private handlePenaltyBoxRoll(player: Player, roll: number): void {
        const isOddRoll = roll % 2 !== 0;
        
        if (isOddRoll) {
            this.isGettingOutOfPenaltyBox = true;
            console.log(`${player.name} is getting out of the penalty box`);
            this.movePlayer(player, roll);
            this.announcePositionAndAskQuestion(player);
        } else {
            this.isGettingOutOfPenaltyBox = false;
            console.log(`${player.name} is not getting out of the penalty box`);
        }
    }

    private handleNormalRoll(player: Player, roll: number): void {
        this.movePlayer(player, roll);
        this.announcePositionAndAskQuestion(player);
    }

    private movePlayer(player: Player, steps: number): void {
        player.position = (player.position + steps) % Game.BOARD_SIZE;
    }

    private announcePositionAndAskQuestion(player: Player): void {
        console.log(`${player.name}'s new location is ${player.position}`);
        console.log(`The category is ${this.currentCategory()}`);
        this.askQuestion();
    }

    private askQuestion(): void {
        const category = this.currentCategory();
        const question = this.questions[category].shift();
        console.log(question);
    }

    private currentCategory(): Category {
        const player = this.getCurrentPlayer();
        return Game.CATEGORIES[player.position % Game.CATEGORIES.length];
    }

    private getCurrentPlayer(): Player {
        return this.players[this.currentPlayerIndex];
    }

    private didPlayerWin(): boolean {
        const player = this.getCurrentPlayer();
        return player.goldCoins === Game.WINNING_COINS;
    }

    private nextPlayer(): void {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }

    public wrongAnswer(): boolean {
        const player = this.getCurrentPlayer();
        
        console.log('Question was incorrectly answered');
        console.log(`${player.name} was sent to the penalty box`);
        
        player.inPenaltyBox = true;
        this.nextPlayer();
        
        return true;
    }

    public wasCorrectlyAnswered(): boolean {
        const player = this.getCurrentPlayer();
        
        if (player.inPenaltyBox && !this.isGettingOutOfPenaltyBox) {
            this.nextPlayer();
            return true;
        }

        console.log('Answer was correct!!!!');
        player.goldCoins += 1;
        console.log(`${player.name} now has ${player.goldCoins} Gold Coins.`);

        const winner = this.didPlayerWin();
        this.nextPlayer();

        return !winner;
    }
}
