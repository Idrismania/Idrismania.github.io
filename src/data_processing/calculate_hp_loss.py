"""Note that this script does not take into account enemy specifics,
like spiky balls dealing extra flat damage."""

import math

def calculate(attack, defense, enemy_hp, enemy_attack, enemy_defense):

    if enemy_defense - attack == 0:
        return "??????"

    # Damage = enemy defense - attack, turns is how many damages fit in enemy hp rounded up
    n_turns = math.ceil(enemy_hp/(-(enemy_defense-attack)))

    dmg_per_turn = defense - enemy_attack

    hp_loss = -(n_turns * dmg_per_turn)

    if hp_loss < 0:
        return "??????"

    return str(hp_loss)

if __name__ == "__main__":
    print()