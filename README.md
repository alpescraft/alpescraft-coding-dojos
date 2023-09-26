# 2048 Game Engine

## Principe

L'affichage est déjà implémenté. Pour ce Kata, il faut coder le moteur de jeu qui prendre la grille à l'instant T et le
déplacement souhaité, pour calculer la prochaine grille à afficher.

## Règles

- Pour toute grille dans laquelle il y a eu un déplacement ou une fusion, une nouvelle cellule est créée avec soit
  un `2`, soit un `4`.
- Si le mouvement demandé n'entraine aucune fusion ou aucun déplacement alors aucune nouvelle cellule est ajoutée.
- Une fusion est possible quand deux cellules avec le même nombre sont côte à côte et que le déplacement demandé est
  dans l'axe de ces deux cellules.
- Si une fusion est possible entre deux éléments, le résultat est la somme des deux cellules : `2 -> 4 -> 8 -> 16...`.
- Si trois cellules sont alignés sur le même axe que le déplacement, seules les deux premières dans l'ordre inverse du
  déplacement cellules sont fusionnées. Par exemple sur 3 `2` sont alignés verticalement et le déplacement demandé
  est `BAS` alors seules les 2 `2` du bas seront fusionnés.
