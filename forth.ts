import { assertEquals } from "jsr:@std/assert";

/*
--- Présentation du document ---
Version TS rédigée pour l'exemple.
Basé sur la version Python créée ensemble.
J'ai préféré suivre les méthodes employées plutôt que refactoriser de mon côté. ☝️
 */

/*
--- Comment tester ---
deno test forth.ts
 */

type Stack = number[];
type Operation = "+" | "-" | "*" | "/";
type Operations = Record<Operation, (stack: Stack) => number>;

const checkBinaryOperand = (stack: Stack): void => {
  if (stack.length < 2) throw new Error('Insufficient number of items in stack');
};

const checkUnaryOperand = (stack: Stack): void => {
  if (stack.length < 1) throw new Error('Insufficient number of items in stack');
};

const divide = (stack: Stack): number => {
  if (stack[-1] == 0) throw new Error("divide by zero");
  const result = Math.floor(stack[-2] / stack[-1]);
  stack.pop();
  stack.pop();
  return result;
};

// "|| 0" est utilisé parce que [].pop() peut retourner undefined
const operations: Operations = {
  "+": stack => (stack.pop() || 0) + (stack.pop() || 0),
  "-": stack => -(stack.pop() || 0) + (stack.pop() || 0),
  "*": stack => (stack.pop() || 0) * (stack.pop() || 0),
  "/": divide,
};

const evaluate = (inputData: string[]): number[] => {
  const stack: Stack = [];
  for (const input of inputData[0].split(' ')) {
    const newStackElement: number = Object.keys(operations).includes(input)
      ? operations[input as Operation](stack)
      : parseInt(input, 10);
    stack.push(newStackElement);
  }
  return stack;
}

// -------------- TESTS --------------
Deno.test("Return the digits when no operations given", () => {
  const result = evaluate(["1 2 3 4 5"]);
  assertEquals(result, [1, 2, 3, 4, 5])
})


Deno.test("Compute the given addition", () => {
  const result = evaluate(["1 2 3 +"]);
  assertEquals(result, [1, 5])
})
