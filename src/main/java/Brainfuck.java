import static java.nio.charset.StandardCharsets.US_ASCII;
import static java.nio.charset.StandardCharsets.UTF_8;

public class Brainfuck {

    public String interpret(String instructions) {
        byte[] array = new byte[30000];
        String output = "";
        int index = 0;

        char[] charArray = instructions.toCharArray();
        for (int i = 0; i < charArray.length; i++) {
            char instruction = charArray[i];
            switch (instruction) {
                case '+':
                    array[index]++;
                    break;
                case '-':
                    array[index]--;
                    break;
                case '.':
                    output += new String(new byte[]{array[index]}, UTF_8);
                    break;
                case '>':
                    index++;
                    break;
                case '<':
                    index--;
                    if (index < 0) {
                        index += 30_000;
                    }
                    break;
                case ']':
                    if (array[index] != 0){
                        i = instructions.indexOf("[");
                    }
                    break;
            }
        }

        return output;
    }
}
