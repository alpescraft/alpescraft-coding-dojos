package com.kata

class ChristmasLights {
    private val grid = Grid()

    fun countLightsOn(): Int {
        return grid.countLightsOn()
    }

    fun turnOn(start: Point, end: Point) {
        apply(start, end) { x, y -> grid.turnOn(Point(x, y)) }
    }

    fun turnOff(start: Point, end: Point) {
        apply(start, end) { x, y -> grid.turnOff(Point(x, y)) }
    }

    fun getLightsOne(): Set<Point> {
        return grid.getLightsOne()
    }

    private fun apply(start: Point, end: Point, whattodo: (Int, Int) -> Unit) {
        for (x in start.x..end.x) {
            for (y in start.y..end.y) {
                whattodo(x, y)
            }
        }
    }
}

enum class State{ON, OFF}

class Grid(val grid: MutableList<MutableList<State>> = MutableList(1000) { MutableList(1000) { State.OFF } }) {
    fun countLightsOn(): Int {
        return grid.sumOf { it.count { it == State.ON } }
    }

    fun turnOn(point: Point) {
        grid[point.y][point.x] = State.ON
    }

    fun turnOff(point: Point) {
        grid[point.y][point.x] = State.OFF
    }

    fun getLightsOne(): Set<Point> {
        return grid.flatMapIndexed { rowIndex, line -> line.mapIndexed {
            colIndex, value -> Point(colIndex, rowIndex) to value } }
            .filter { it.second == State.ON }
            .map { it.first }
            .toSet()
    }
}
