from math import floor

class StackUnderflowError(Exception):
    pass

def checkBinaryOperand(stack):
    if len(stack) < 2:
        raise StackUnderflowError("Insufficient number of items in stack")
def checkUnaryOperand(stack):
    if len(stack) < 1:
        raise StackUnderflowError("Insufficient number of items in stack")

def divide(stack):
    if (stack[-1] == 0):
        raise ZeroDivisionError("divide by zero")
    result = floor(stack[-2] / stack[-1])
    stack.pop()
    stack.pop()
    return result

operations = {
    "+": lambda stack : stack.pop() + stack.pop(),
    "-": lambda stack : - stack.pop() + stack.pop(),
    "*": lambda stack : stack.pop() * stack.pop(),
    "/": divide,
}

def evaluate(input_data: list) -> list:
    stack = []
    isDefiningWord = False
    isDefiningWord = 5
    for input in input_data:
        for element in input.split(" "):
            if not isDefiningWord and element in operations.keys():
                checkBinaryOperand(stack)
                diff = operations[element](stack)
                stack.append(diff)
            elif element == ":":
                isDefiningWord = True
            elif element == ";":
                isDefiningWord = False
            elif not isDefiningWord and element  == "dup":
                checkUnaryOperand(stack)
                stack.append(stack[-1])
            else:
                if isDefiningWord :
                    continue
                stack.append(int(element))
    return stack
