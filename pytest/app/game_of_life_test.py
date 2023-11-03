World = list[list[bool]]


def evolve(world: World) -> World:
    empty_world = [[0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]]
    one_counter = 0
    for i, line in enumerate(world):
        for j, row in enumerate(line):
            if world[i][j] == 1:
                one_counter = one_counter + 1


    if(one_counter > 1):
        return world
    else:
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

    def test_a_cell_need_at_least_two_living_neighbors_to_remain_alived(self):
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

    def test_a_cell_need_at_least_two_living_neighbors_to_remain_alived2(self):
        empty_world: World = [[0, 0, 0, 0],
                              [0, 1, 1, 0],
                              [0, 1, 1, 0],
                              [0, 0, 0, 0]]
        next_world: World = evolve(empty_world)
        expected: World = [[0, 0, 0, 0],
                           [0, 1, 1, 0],
                           [0, 1, 1, 0],
                           [0, 0, 0, 0]]
        assert next_world == expected