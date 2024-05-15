#!/usr/bin/env python

import rpg_combat
import json


def init_characters(characters_as_json):
    characters = json.loads(characters_as_json, object_hook=lambda c: rpg_combat.Character(**c))
    return dict((character.name, character) for character in characters)


def init_moves(moves_as_json):
    moves = []
    raw_moves = json.loads(moves_as_json)
    for move in raw_moves:
        moveType = move["moveType"]
        if moveType == "DealDamage":
            moves.append(rpg_combat.DealDamage(move["character1"], move["character2"], move["amount"]))
        if moveType == "Heal":
            moves.append(rpg_combat.Heal(move["character"], move["amount"]))
        if moveType == "JoinFaction":
            moves.append(rpg_combat.JoinFaction(move["character"], move["factionName"]))
    return moves


def main():
    # Arrange
    with open("characters.json") as f:
        characters_as_json = f.read()

    with open("combat_moves.json") as f:
        combat_moves_as_json = f.read()

    characters = init_characters(characters_as_json)
    print_characters(characters)

    moves = init_moves(combat_moves_as_json)

    # Act
    print("")
    for move in moves:
        print(f"playing move {move}")
        rpg_combat.play(characters, move)

    # Assert
    print_characters(characters)


def print_characters(characters):
    print("")
    print("Characters:")
    for name, character in list(sorted(characters.items())):
        print(f"    {character}")


if __name__ == "__main__":
    main()
