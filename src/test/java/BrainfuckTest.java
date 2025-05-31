import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;


class BrainfuckTest {

    @Test
    @DisplayName("Should Display Empty Valye")
    void shouldDisplayEmptyValue_when() {
        Brainfuck brainfuck = new Brainfuck();
        String value = brainfuck.interpret(".");
        assertThat(value).isEqualTo("\u0000");
    }

    @Test
    void plusShouldIncreaseDisplayValue() {
        Brainfuck brainfuck = new Brainfuck();
        String value = brainfuck.interpret("+.");
        assertThat(value).isEqualTo("\u0001");
    }

    @Test
    void minusShouldIncreaseDisplayValue() {
        Brainfuck brainfuck = new Brainfuck();
        String value = brainfuck.interpret("-.");
        assertThat(value).isEqualTo("�");
    }

    @Test
    void twoPlus() {
        Brainfuck brainfuck = new Brainfuck();
        String value = brainfuck.interpret("++.");
        assertThat(value).isEqualTo("\u0002");
    }

    @Test
    void shouldPrintTwice() {
        Brainfuck brainfuck = new Brainfuck();
        String value = brainfuck.interpret("..");
        assertThat(value).isEqualTo("\u0000\u0000");
    }

    @Test
    void shouldMoveRight() {
        Brainfuck brainfuck = new Brainfuck();
        String value = brainfuck.interpret("+>+.");
        assertThat(value).isEqualTo("\u0001");
    }

    @Test
    void shouldMoveLeft() {
        Brainfuck brainfuck = new Brainfuck();
        String value = brainfuck.interpret("+<+.");
        assertThat(value).isEqualTo("\u0001");
    }

    @Test
    void loop() {
        Brainfuck brainfuck = new Brainfuck();
        String value = brainfuck.interpret("+[+].");
        assertThat(value).isEqualTo("\u0000");
    }

    @Test
    void doubleLoop() {
        Brainfuck brainfuck = new Brainfuck();
        String value = brainfuck.interpret("--[+.]");
        assertThat(value).isEqualTo("�\u0000");
    }

    @Test
    void code() {
        Brainfuck brainfuck = new Brainfuck();
        String value = brainfuck.interpret("++++++++++[>+>+++>+++++++>++++++++++<<<<-]>>>>++++++++++++++++++.-----------------.+++++++++.---------.+++++++++++++++++++++.<<++.>>------.-----.++++++.--.<<.>>------------------.<<.>-----.>+++++++++++.++++.-----------.++++++++++++++.<++.>-.-----------------.+++++.++++++++++++++.");
        assertThat(value).isEqualTo("??");
    }
}
