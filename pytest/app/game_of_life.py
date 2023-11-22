import copy

World = list[list[int]]


def evolve(world: World) -> World:

    next_world = copy.deepcopy(world)

    for row in range(1, len(world)-1) :
        for column in range(1, len(world[0])-1) :
            if len(world[0]) < column+2:
                return next_world
            next_world[row][column] = 0
            if nombre_de_voisins_vivants(world, row, column) in [2, 3]:
                next_world[row][column] = 1

    return next_world


def nombre_de_voisins_vivants(world, row, column):
    return world[row - 1][column - 1] + \
        world[row - 1][column] + \
        world[row - 1][column + 1] + \
        world[row][column - 1] + \
        world[row][column + 1] + \
        world[row + 1][column - 1] + \
        world[row + 1][column] + \
        world[row + 1][column + 1]


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

    def test_middle_cell_should_live5(self):
        world: World = [[1, 0, 0, 1],
                        [1, 0, 0, 1],
                        [1, 0, 0, 1]]
        next_world: World = evolve(world)
        assert next_world[1][2] == 1

    def test_middle_cell_should_live666(self):
        world: World = [[1, 1, 1],
                        [0, 0, 0],
                        [0, 0, 0],
                        [1, 1, 1]]
        next_world: World = evolve(world)
        assert next_world[2][1] == 1
