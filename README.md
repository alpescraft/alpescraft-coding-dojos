# Star battle kata

***Difficulty: medium***  
***Interests: algorithm and TDD, confidence in tests, test cases coverage***

Star battle, also known as Queens or "Two not touch", is a logic puzzle played on a grid.
See the file star-battle-539765173.pdf for an example and rules.  
Play it online at https://fr.puzzle-star-battle.com/ or https://krazydad.com/play/starbattle/  

They are many version of this puzzle game, mainly with a different number of stars in a region.
Here, the version is the one with one star by row, column and region, given that 2 stars can't be adjacent even in diagonal. It is
also the easiest version because a puzzle with more than one star leads to a combinatorial explosion.

The goal of this kata is to write a simple CSP (Constraint Satisfaction Problem) solver without guessing and thus without backtracking.
By means of constraint rules, one can find out some cells with a star and others without star (a star would lead to a constraint violation).  
How much grids can be solved by the algorithm ? Surprisingly, many of them can be solved, at least with the set of grids used for this kata.

The directory grids contains grid descriptions in json format, and comes from https://github.com/sprestrelski/queens/tree/master.
(2 grids are invalid because they are not a square).

## Retrospective
Did you create only black box tests or also some white box tests in order to test some private parts of the algorithm ?  
Which approach did you use, the London school (top-down) or the Chicaco school (bottom-up), to write the tests (TDD of course !) and the code ?  
How confident are you in the ability of the algorithm to always find the solution of a grid if there is one that doesn't require
guessing/backtracking to be found ? Or not produce a wrong solution ?

## Going further
Can your code be easily modified to do backtracking and solve all the grids ?  
In fact, some grids may have more than one solution. Thus, the solver has to return a list of solutions.  
Does your code need many changes to solve grids with 2 stars per region ?
