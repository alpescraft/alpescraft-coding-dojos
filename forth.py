
class StackUnderflowError(Exception):
    pass

def evaluate(input_data: list) -> list:
    stack = []
    aliases = {}
    for instruction in input_data:
        input = instruction.split(" ")
        for element in input :
            if element == "+" :
                stack.append(stack.pop() + stack.pop())
            elif element == "-":
                stack.append(- stack.pop() + stack.pop())
            elif element == "*":
                stack.append(stack.pop() * stack.pop())
            elif element == "/":
                stack.append(1 / stack.pop() * stack.pop())
            elif element == "DUP":
                stack.append(stack[-1])
            elif element == ":":
                aliases[input[1]] = input[2:-1]
                break
            elif element in aliases :
                stack += list(map(lambda x : int(x), aliases[element]))
            else:
                stack.append(int(element))
    return stack
