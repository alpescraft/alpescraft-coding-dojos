# Coding Dojo #1

A simple rust exercise to be done in a coding dojo.
This is based on Advent of Code 2022 day 1: <https://adventofcode.com/2022/day/1>

The subject has been extended to manage error and show ownership concepts.

I think this example is not difficult from a algorithmic point of view,
the idea is to really decompose the problem into smaller pieces and provides
unitary tests for each of them.
So attendes could focus on TDD and discover some part of the Rust language.

## Expectations

Give participants some Rust insight that will give them
motivations to learn more.
This is also an experimentation to know if this approach could help people
to start and learn Rust.

## Instruction

### Part 1

Santa's reindeer typically eat regular reindeer food, but they need a
lot of magical energy to deliver presents on Christmas. For that, their
favorite snack is a special type of star fruit that only grows deep in the
jungle. The Elves have brought you on their annual expedition to the grove
where the fruit grows.

To supply enough magical energy, the expedition needs to retrieve a minimum
of fifty stars by December 25th. Although the Elves assure you that the
grove has plenty of fruit, you decide to grab any fruit you see along the
way, just in case.

Collect stars by solving puzzles. Two puzzles will be made available on
each day in the Advent calendar; the second puzzle is unlocked when you
complete the first. Each puzzle grants one star. Good luck!

The jungle must be too overgrown and difficult to navigate in vehicles or
access from the air; the Elves' expedition traditionally goes on foot. As your
boats approach land, the Elves begin taking inventory of their supplies. One
important consideration is food - in particular, the number of Calories
each Elf is carrying (your puzzle input).

The Elves take turns writing down the number of Calories contained by the
various meals, snacks, rations, etc. that they've brought with them, one
item per line. Each Elf separates their own inventory from the previous
Elf's inventory (if any) by a blank line.

For example, suppose the Elves finish writing their items' Calories and
end up with the following list:

    1000
    2000
    3000

    4000

    5000
    6000

    7000
    8000
    9000

    10000

This list represents the Calories of the food carried by five Elves:

- The first Elf is carrying food with 1000, 2000, and 3000 Calories,
  a total of 6000 Calories.
- The second Elf is carrying one food item
  with 4000 Calories.
- The third Elf is carrying food with 5000 and
  6000 Calories, a total of 11000 Calories.
- The fourth Elf is carrying
  food with 7000, 8000, and 9000 Calories, a total of **24000** Calories.
- The fifth Elf is carrying one food item with 10000 Calories.

In case the Elves get hungry and need extra snacks, they need to know
which Elf to ask: they'd like to know how many Calories are being carried
by the Elf carrying the most Calories. In the example above, this is **24000**
(carried by the fourth Elf).

Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?

### Part 2

By the time you calculate the answer to the Elves' question, they've already
realized that the Elf carrying the most Calories of food might eventually
run out of snacks.

To avoid this unacceptable situation, the Elves would instead like to
know the total Calories carried by the top three Elves carrying the most
Calories. That way, even if one of those Elves runs out of snacks, they
still have two backups.

In the example above, the top three Elves are the fourth Elf (with 24000
Calories), then the third Elf (with 11000 Calories), then the fifth Elf
(with 10000 Calories). The sum of the Calories carried by these three elves
is 45000.

Find the top three Elves carrying the most Calories. How many Calories are
those Elves carrying in total?

### Part 3

An elf was drunk when providing the list.
So instead of writing the line with 8000, he wrote "Bleurg!!".

If a line cannot be transformed to a correct value, then the value is 0.

Write the corresponding test and fix the code to handle that case.

### Part 4

The highest calorie count identified in part1 must be saved on Santa Claus's
computer.

For this purpose, a **SantaComputer struct** that holds the data and
a checksum is required. The elves are currently developing this interface,
which may undergo modifications; hence, it's advised to employ a function
named **data** to calculate the data and another function named **checksum**
to generate the checksum.

Additionally, for security measures, the elves
have provided a function named **get_santa_computer_secret**.

This function must be used with the part1 data to retrieve the secret value
before the data and checksum calculations are performed.

### Part 5

The elves have just discovered json, you should now provide the
SantaComputer struct serialized into json.

### Part 6

Starting from part2, if you encounter an invalid value, you must not set it to 0.
You must discard all the colories transported by that elf.

### Part 7

Create a checksum2 function that return an &str instead of a string.

### Part 8

Create a .top(n) method that return the top n elements of a Vec.
This can be achieved using the extension traits pattern.

## Proposed editor

The idea is to use on online editor. Gitpod seems a good solution in that
case as only a browser is required to edit the code and the workspace can
be shared between participants.
![Edition into Gitpod](pictures/gitpod.png)
