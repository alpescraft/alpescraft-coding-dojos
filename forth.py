
class StackUnderflowError(Exception):
    pass

def evaluate(input_data: list) -> list:
    results = []
    aliases = {}
    for instruction in input_data:
        for alias,value in aliases.items():
            instruction = instruction.replace(" " + alias, " " + value)
        elements = instruction.split(" ")
        if elements[0] == ":":
            aliases[elements[1]] = " ".join(elements[2:-1])
        else:
            stack = []
            for element in elements:
                if element == "+":
                    if len(stack) < 2 :
                        raise StackUnderflowError("Stack Underflow")
                    stack.append(stack.pop()+stack.pop())
                elif element == "-":
                    if len(stack) < 2 :
                        raise StackUnderflowError("Stack Underflow")
                    op2, op1 = stack.pop(), stack.pop()
                    stack.append(op1 - op2)
                else:
                    stack.append(int(element))
            results += stack
    return results
