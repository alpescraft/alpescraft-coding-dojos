

def interprete(param):
    array = bytearray(30000)
    positionArray = 0
    positionParam = 0

    loopStart = None

    output = ""
    while positionParam < len(param):
        instruction = param[positionParam]
        if instruction == "+":
            array[positionArray] = array[positionArray]+1 if array[positionArray] != 255 else 0

        if instruction == "-":
            array[positionArray] = 255 if array[positionArray] == 0 else array[positionArray]-1

        if instruction == ".":
            output += chr(array[positionArray])

        if instruction == ">":
            positionArray += 1

        if instruction == "<":
            positionArray -= 1

        if instruction == "[":
            loopStart = positionParam

        if instruction == "]" and array[positionArray] != 0:
            positionParam = loopStart

        positionParam += 1
    return output


def test_empty_instructions():
    output = interprete("")
    assert "" == output


def test_output_value():
    output = interprete(".")
    assert "\x00" == output

def test_plus_increment_value_at_current_position_and_print():
    output = interprete("+.")
    assert "\x01" == output

def test_plus_increment_value_at_current_position():
    output = interprete("+")
    assert "" == output

def test_many_plus_increment_value_at_current_position_and_print():
    output = interprete("++..")
    assert "\x02\x02" == output

def test_minus():
    output = interprete("-.")
    assert output == "\xff"

def test_minusv2():
    output = interprete("++-.")
    assert output == "\x01"

def test_moving_forward():
    output = interprete("+>.")
    assert output == "\x00"

def test_moving_forwardandbackward():
    output = interprete("+><.")
    assert output == "\x01"

def test_outside_255plus_overflow():
    output = interprete("+"*256+".")
    assert output == "\x00"

def test_loop():
    output = interprete("++++++++++[>+>+++>+++++++>++++++++++<<<<-]>>>++++++.>+.<<++.>++++++++.----------------..<.>>--.<<+++++++.>>++.++++++++++++++.+.<<-------.>>--------.-----------.<<.>>+++++++++++++++++++++.-------------.----.")
    assert output == "\x00"