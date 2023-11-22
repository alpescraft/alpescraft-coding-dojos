World = list[list[int]]


def evolve(world: World) -> World:
    world[1][1] = 0
    if len(world[0]) < 3:
        return world
    n = world[0][0] + \
        world[0][1] + \
        world[0][2] + \
        world[1][0] + \
        world[1][2] + \
        world[2][0] + \
        world[2][1] + \
        world[2][2]
    if n == 2 or n == 3:
        world[1][1] = 1

    if len(world[0]) < 4:
        return world
    world[1][2] = 0
    n = world[0][1] + \
        world[0][2] + \
        world[0][3] + \
        world[1][1] + \
        world[1][3] + \
        world[2][1] + \
        world[2][2] + \
        world[2][3]
    if n == 2 or n == 3:
        world[1][2] = 1
    return world


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

    def test_cell_should_die(self):
        world: World = [[0, 0, 0, 0],
                        [0, 1, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]]
        next_world: World = evolve(world)
        expected: World = [[0, 0, 0, 0],
                           [0, 0, 0, 0],
                           [0, 0, 0, 0],
                           [0, 0, 0, 0]]
        assert next_world == expected

    def test_first_cell_should_live(self):
        world: World = [[1, 1],
                        [1, 0]]
        next_world: World = evolve(world)
        assert next_world[0][0] == 1

    def test_middle_cell_should_die(self):
        world: World = [[1, 1, 1],
                        [1, 1, 1],
                        [1, 1, 1]]
        next_world: World = evolve(world)
        assert next_world[1][1] == 0

    def test_middle_cell_should_live(self):
        world: World = [[0, 0, 1],
                        [0, 1, 1],
                        [0, 0, 0]]
        next_world: World = evolve(world)
        assert next_world[1][1] == 1

    def test_middle_cell_should_live2(self):
        world: World = [[0, 0, 1],
                        [1, 1, 1],
                        [0, 0, 0]]
        next_world: World = evolve(world)
        assert next_world[1][1] == 1

    def test_middle_cell_should_live3(self):
        world: World = [[0, 0, 1],
                        [0, 0, 1],
                        [0, 0, 1]]
        next_world: World = evolve(world)
        assert next_world[1][1] == 1
    def test_middle_cell_should_live4(self):
        world: World = [[0, 0, 0, 1],
                        [0, 0, 0, 1],
                        [0, 0, 0, 1]]
        next_world: World = evolve(world)
        assert next_world[1][2] == 1