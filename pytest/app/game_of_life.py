import unittest

World = list[list[int]]

def evolve(world: World) -> World:
    return world


class TestGameOfLife(unittest.TestCase):

    def test_empty_world_evolution_remains_empty(self):
        empty_world: World = [[0, 0, 0, 0],
                              [0, 0, 0, 0],
                              [0, 0, 0, 0],
                              [0, 0, 0, 0]]
        next_world: World = evolve(empty_world)
        expected: World = [[0, 0, 0, 0],
                           [0, 0, 0, 0],
                           [0, 0, 0, 0],
                           [0, 0, 0, 0]]
        self.assertEqual(next_world, expected)