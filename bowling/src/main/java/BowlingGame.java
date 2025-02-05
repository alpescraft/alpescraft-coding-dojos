import java.util.ArrayList;
import java.util.List;

record Frame (
    int tryOne,
    int tryTwo
){};

class BowlingGame {

    private static final int MAX_FRAME = 10;
    int tryNumber = 0;
    private int score;
    private Frame currentFrame;
    private List<Frame> rolls = new ArrayList();

    void roll(int pins) {
        if (tryNumber % 2 == 0){
            currentFrame = new Frame(pins, 0);
            if( pins == 10 ) {
                rolls.add(currentFrame);
                tryNumber++;
            }
        }
        else
        {
            currentFrame = new Frame(currentFrame.tryOne(), pins);
            rolls.add(currentFrame);
        }
        tryNumber++;
    }

    int score() {
        for (int i = 0; i < MAX_FRAME; i++) {
            Frame frame = rolls.get(i);

            score += frame.tryOne() + frame.tryTwo();
            if (frame.tryOne() == 10){
                    if( rolls.get(i+1).tryOne() != 10 ) {
                        score += rolls.get(i+1).tryOne() + rolls.get(i+1).tryTwo();
                    }
                    else {
                        score += rolls.get(i+1).tryOne() + rolls.get(i+2).tryOne();
                    }
            }
            else if (frame.tryOne() + frame.tryTwo() == 10){
                    score += rolls.get(i+1).tryOne();
            }
        }
        return score;
    }

}