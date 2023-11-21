import cellpylib as cpl
import numpy as np

from app.game_of_life import World


def evolve_cellpy(world: World) -> World:
    return cpl.evolve2d(np.array([world]), timesteps=2, neighbourhood='Moore',
                        apply_rule=cpl.game_of_life_rule, memoize='recursive').tolist()[1]


if __name__ == '__main__':
    cellular_automaton = cpl.init_random2d(60, 60)

    cellular_automaton = cpl.evolve2d(cellular_automaton, timesteps=400, neighbourhood='Moore',
                                      apply_rule=cpl.game_of_life_rule, memoize='recursive')

    cpl.plot2d_animate(cellular_automaton)
