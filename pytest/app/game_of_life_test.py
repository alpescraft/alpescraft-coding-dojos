World = list[list[bool]]

def evolve(world: World) -> World:
    empty_world = [[0, 0, 0, 0],
                   [0, 0, 0, 0],
                   [0, 0, 0, 0],
                   [0, 0, 0, 0]]
    return empty_world

class TestGameOfLife:

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
        assert next_world == expected

    def test_a_cell_without_living_neighbors_dies(self):
        empty_world: World = [[0, 0, 0, 0],
                              [0, 0, 1, 0],
                              [0, 0, 0, 0],
                              [0, 0, 0, 0]]
        next_world: World = evolve(empty_world)
        expected: World = [[0, 0, 0, 0],
                           [0, 0, 0, 0],
                           [0, 0, 0, 0],
                           [0, 0, 0, 0]]
        assert next_world == expected