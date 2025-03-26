package jfm.kata.starbattle

import java.awt.geom.Point2D.distance
import kotlin.math.sqrt

data class Cell(val row: Int, val col: Int)

data class Grid(val regions: List<Set<Cell>>) {

    constructor(linearGridDescription: IntArray) : this(convertToStarGrid(linearGridDescription))

    companion object {
        fun convertToStarGrid(linearGridDescription: IntArray): List<Set<Cell>> {
            val gridSize = sqrt(linearGridDescription.size.toDouble()).toInt()
            assert(
                linearGridDescription.size == gridSize * gridSize,
                { "must be square" }) // TODO quick and dirty ! Use exception instead
            val regions = (0..<gridSize).flatMap { row -> (0..<gridSize).map { col -> Cell(row, col) } }
                .zip(linearGridDescription.asList())
                .groupBy { pair: Pair<Cell, Int> -> pair.second }
                .values
                .map { listByRegion -> listByRegion.map { it.first }.toSet() }
            assert(
                regions.size == gridSize,
                { "found ${regions.size} instead of $gridSize" }) // TODO quick and dirty ! Use exception instead
            return regions
        }
    }

    /**
     * Returns the cells containing a star if a solution has been found, otherwise returns an empty set.
     */
    fun solve(): Set<Cell> {
        return emptySet() // TODO !
    }

    fun isStarAllowed(cell: Cell): Boolean {
        return !this.regions.filter { !it.contains(cell) }.any { region ->
            alignedRegion(region, cell) || asideRegion(region,cell)
        }
    }

    private fun asideRegion(region: Set<Cell>, cell: Cell): Boolean {
        return (region - discardedCells)
            .all { target -> distance(target.col.toDouble(), target.row.toDouble(), cell.col.toDouble(), cell.row.toDouble()) < 2}
    }

    private fun alignedRegion(
        region: Set<Cell>,
        cell: Cell
    ): Boolean {
        val cellsNotDiscarded = region - discardedCells
        return cellsNotDiscarded.all { target -> target.col == cell.col } ||
                cellsNotDiscarded.all { target -> target.row == cell.row }
    }

    val discardedCells : MutableSet<Cell> = mutableSetOf()
    fun discardCell(cell: Cell) {
        discardedCells.add(cell)
    }
}
