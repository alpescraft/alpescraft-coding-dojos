class GameOfLife:
    def get_world(self) -> list[list[bool]]:
        return [[0] * 4] * 4

    

class TestGameOfLife:

    def test_by_default_the_world_is_empty(self):
        game = GameOfLife()
        world: list[list[bool]] = game.get_world()
        expected: list[list[bool]] = [[0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0]]
        assert world == expected
