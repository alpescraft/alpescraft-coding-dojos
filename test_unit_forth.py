import unittest

from forth import evaluate, StackUnderflowError


class ForthTest(unittest.TestCase):

    def test_single_element(self):
        self.assertEqual(evaluate(["1"]), [1])

    def test_three_element(self):
        self.assertEqual(evaluate(["1 2 3"]), [1, 2, 3])

    def test_add(self):
        self.assertEqual(evaluate(["1 2 +"]), [3])

    def test_multiple_add(self):
        self.assertEqual(evaluate(["1 2 + 1 2 + +"]), [6])

    def test_underflow(self):
        self.assertRaises(StackUnderflowError, evaluate, ["1 2 + +"])

    def test_minus(self):
        self.assertEqual(evaluate(["1 2 -"]), [-1])

    def test_multi_instructions(self):
        self.assertEqual(evaluate(["1 2 -", "2 3 +"]), [-1, 5])

    def test_alias(self):
        self.assertEqual(evaluate([": ADD-TWICE + + ;", "1 -2 12 ADD-TWICE"]), [11])

    def test_two_alias(self):
        self.assertEqual(evaluate([": INC 1 + ;", ": DOBBLE-INC INC INC ;", "1 DOBBLE-INC"]), [3])
