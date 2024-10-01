import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class GameTest {

    @Test
    public void shouldHaveCorrectInitialValue(){
        assertEquals(0, new Game().score());
    }

    @Test
    public void shouldScore3WhenRoll3(){
        // Given
        Game game = new Game();

        // When
        game.roll(3);

        // Then
        assertEquals(3, game.score());
    }

    @Test
    public void shouldScore6WhenRoll3Twice(){
        // Given
        Game game = new Game();

        // When
        game.roll(3);
        game.roll(3);

        // Then
        assertEquals(6, game.score());
    }

    @Test
    public void shouldScore16WhenSpareThen3(){
        // Given
        Game game = new Game();

        // When
        game.roll(9);
        game.roll(1);
        game.roll(3);

        // Then
        assertEquals(16, game.score());
    }
    @Test
    public void shouldNotSpareOverFrameBoundary(){
        // Given
        Game game = new Game();

        // When
        game.roll(5);
        game.roll(2);
        game.roll(8);
        game.roll(1);

        // Then
        assertEquals(16, game.score());
    }
    @Test
    public void shouldStrike(){
        // Given
        Game game = new Game();

        // When
        game.roll(10);
        game.roll(0);
        game.roll(8);
        game.roll(1);

        // Then
        assertEquals(28, game.score());
    }
}