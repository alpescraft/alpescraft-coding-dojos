#!/usr/bin/env python

class Character:
    def __init__(self, name, health, isAlive):
        self.factions = set()
        self.name = name
        self.health = health

    @property
    def isAlive(self):
        return self.health > 0

    def receive_damage(self, attacker: 'Character', damagePoints: int):
        if attacker is self : return
        if not attacker.isAlive : return
        self.health -= damagePoints
        self.health = max(0, self.health)

    def __str__(self) -> str:
        status = "Alive" if self.isAlive else "Dead"
        factions = f", Factions={self.factions}" if len(self.factions) != 0 else ""
        return f"<{self.name}, Health={self.health} ({status}){factions}>"

    def heal(self, healPoints):
        if not self.isAlive : return
        self.health += healPoints

    def join(self, factionName):
        self.factions.add(factionName)


class Move:
    """abstract interface to use a superclass"""

    def play(self, characters: dict[str, Character]):
        pass


class DealDamage(Move):
    def __init__(self, attacker_name, defender_name, amount):
        self.attacker_name = attacker_name
        self.defender_name = defender_name
        self.damagePoints = amount

    def play(self, characters: dict[str, Character]):
        attacker = characters[self.attacker_name]
        defender = characters[self.defender_name]
        defender.receive_damage(attacker, self.damagePoints)

    def __str__(self) -> str:
        return f"<{self.attacker_name} DealDamage={self.damagePoints} to {self.defender_name}>"

class Heal(Move):
    def __init__(self, character, amount):
        self.character = character
        self.healPoints = amount

    def play(self, characters: dict[str, Character]):
        character = characters[self.character]
        character.heal(self.healPoints)

    def __str__(self) -> str:
        return f"<{self.character} heal={self.healPoints}>"

class JoinFaction(Move):
    def __init__(self, character, factionName):
        self.character = character
        self.factionName = factionName

    def play(self, characters: dict[str, Character]):
        character = characters[self.character]
        character.join(self.factionName)

    def __str__(self) -> str:
        return f"<{self.character} joinFaction={self.factionName}>"


def play(characters: dict[str, Character], move: Move):
    move.play(characters)
