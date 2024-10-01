import java.util.ArrayList;
import java.util.List;

public class Game {
    private List<Integer> rolls = new ArrayList<>();

    public void roll(int pins) {
        rolls.add(pins);
    }

    public int score() {
        int sum = 0;
        for (int i = 0; i < rolls.size(); i += 2) {
            int previous2 = i >= 2 ? rolls.get(i - 2) : 0;
            int previous1 = i >= 1 ? rolls.get(i - 1) : 0;
            int current = rolls.get(i);
            int next = i < rolls.size() - 1 ? rolls.get(i + 1) : 0;
            sum += current + next;

            if (isStrike(previous2)) {
                sum += current + next;
            }
            else if (isSpare(previous1, previous2)) {
                sum += current;
            }
        }
        return sum;
    }

    private boolean isStrike(int previous2) {
        return previous2 == 10;
    }

    private static boolean isSpare(int roll1, int roll2) {
        return roll1 + roll2 == 10;
    }
}
