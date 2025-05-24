import unittest

from forth import evaluate

class ForthTest(unittest.TestCase):

    def test_evaluate(self):
        self.assertEqual(evaluate(["1 2 3 4 5"]), [1, 2, 3, 4, 5])

    def test_1plus(self):
        self.assertEqual(evaluate(["1 2 +"]), [3])

    def test_2plus(self):
        self.assertEqual(evaluate(["1 3 +"]), [4])

    def test_3plus(self):
        self.assertEqual(evaluate(["1 3 + 1"]), [4, 1])

    def test_4plus(self):
        self.assertEqual(evaluate(["1 3 + 1 2 3 + +"]), [4, 6])

    def test_1minus(self):
        self.assertEqual(evaluate(["1 3 -"]), [-2])

    def test_2minus(self):
        self.assertEqual(evaluate(["4 1 3 - -"]), [6])

    def test_1time(self):
        self.assertEqual(evaluate(["4 2 *"]), [8])

    def test_double_instructins(self):
        self.assertEqual(evaluate(["6 4 /", "7 3 +"]), [1.5, 10])

    def test_1divide(self):
        self.assertEqual(evaluate(["6 4 /"]), [1.5])

    def test_1dup(self):
        self.assertEqual(evaluate(["6 4 DUP"]), [6,4,4])

    def test_0instruc(self):
        self.assertEqual(evaluate([": TOTO 7 ;", "3 TOTO"]), [3,7])

    def test_1instruc(self):
        self.assertEqual(evaluate([": TOTO 7 7 ;", "3 TOTO"]), [3,7,7])

    # def test_1instruc(self):
    #     self.assertEqual(evaluate([": DUP-TWICE DUP DUP ;", "3 DUP-TWICE"]), [3,3,3])

