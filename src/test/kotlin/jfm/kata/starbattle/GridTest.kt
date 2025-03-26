package jfm.kata.starbattle

import io.kotest.matchers.collections.shouldContainOnly
import io.kotest.matchers.comparables.shouldBeGreaterThanOrEqualTo
import io.kotest.matchers.equals.shouldBeEqual
import io.kotest.matchers.shouldBe
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import org.junit.jupiter.api.Disabled
import org.junit.jupiter.api.Test
import java.io.File
import java.lang.Error
import kotlin.math.sqrt

class GridTest {

    @Test
    fun `star not allowed under region column`() {
//        1, 1, 1, 2
//        3, 1, 1, 2
//        3, 4, 4, 2
//        3, 3, 4, 4
        val grid4x4 = Grid(
            listOf(
                setOf(Cell(0, 0), Cell(0, 1), Cell(0, 2), Cell(1, 1), Cell(1, 2)),
                setOf(Cell(0, 3), Cell(1, 3), Cell(2, 3)),
                setOf(Cell(1, 0), Cell(2, 0), Cell(3, 0), Cell(3, 1)),
                setOf(Cell(2, 1), Cell(2, 2), Cell(3, 2), Cell(3, 3))
            )
        )

        val result: Boolean = grid4x4.isStarAllowed(Cell(3,3))

        result shouldBe false
    }

    @Test
    fun `star allowed not under region column`() {
//        1, 1, 1, 2
//        3, 1, 1, 2
//        3, 4, 4, 2
//        3, 3, 4, 4
        val grid4x4 = Grid(
            listOf(
                setOf(Cell(0, 0), Cell(0, 1), Cell(0, 2), Cell(1, 1), Cell(1, 2)),
                setOf(Cell(0, 3), Cell(1, 3), Cell(2, 3)),
                setOf(Cell(1, 0), Cell(2, 0), Cell(3, 0), Cell(3, 1)),
                setOf(Cell(2, 1), Cell(2, 2), Cell(3, 2), Cell(3, 3))
            )
        )

        val result: Boolean = grid4x4.isStarAllowed(Cell(3,2))

        result shouldBe true
    }

    @Test
    fun `star not allowed aside region line`() {
        val grid4x4 = Grid(
            listOf(
                setOf(Cell(0, 0), Cell(1, 0), Cell(2, 0), Cell(1, 1), Cell(2, 1)),
                setOf(Cell(3, 0), Cell(3, 1), Cell(3, 2)),
                setOf(Cell(0, 1), Cell(0, 2), Cell(0, 3), Cell(1, 3)),
                setOf(Cell(1, 2), Cell(2, 2), Cell(2, 3), Cell(3, 3))
            )
        )

        val result: Boolean = grid4x4.isStarAllowed(Cell(3,3))

        result shouldBe false
    }

    @Test
    fun `star not allowed aside whole region`() {
//        1, 1, 1, 2
//        3, 1, 1, 2
//        3, 4, 4, 2
//        3, 3, 4, 4
        val grid4x4 = Grid(
            listOf(
                setOf(Cell(0, 0), Cell(0, 1), Cell(0, 2), Cell(1, 1), Cell(1, 2)),
                setOf(Cell(0, 3), Cell(1, 3), Cell(2, 3)),
                setOf(Cell(1, 0), Cell(2, 0), Cell(3, 0), Cell(3, 1)),
                setOf(Cell(2, 1), Cell(2, 2), Cell(3, 2), Cell(3, 3))
            )
        )

        val result: Boolean = grid4x4.isStarAllowed(Cell(2,1))

        result shouldBe false
    }

    @Test
    fun `star not allowed under region column with memory`() {
//        1, 1, 1, 2
//        3, 1, 1, 2
//        3, 4, 4, 2
//        3, 3, 4, 4
        val grid4x4 = Grid(
            listOf(
                setOf(Cell(0, 0), Cell(0, 1), Cell(0, 2), Cell(1, 1), Cell(1, 2)),
                setOf(Cell(0, 3), Cell(1, 3), Cell(2, 3)),
                setOf(Cell(1, 0), Cell(2, 0), Cell(3, 0), Cell(3, 1)),
                setOf(Cell(2, 1), Cell(2, 2), Cell(3, 2), Cell(3, 3))
            )
        )

        grid4x4.discardCell(Cell(3, 1))
        val result: Boolean = grid4x4.isStarAllowed(Cell(0,0))

        result shouldBe false
    }

    @Disabled
    @Test
    fun `this 4x4 grid should be solved`() {
//        1, 1, 1, 2
//        3, 1, 1, 2
//        3, 4, 4, 2
//        3, 3, 4, 4
        val grid4x4 = Grid(
            listOf(
                setOf(Cell(0, 0), Cell(0, 1), Cell(0, 2), Cell(1, 1), Cell(1, 2)),
                setOf(Cell(0, 3), Cell(1, 3), Cell(2, 3)),
                setOf(Cell(1, 0), Cell(2, 0), Cell(3, 0), Cell(3, 1)),
                setOf(Cell(2, 1), Cell(2, 2), Cell(3, 2), Cell(3, 3))
            )
        )

        val starCells = grid4x4.solve()

//        .*..
//        ...*
//        *...
//        ..*.
        starCells shouldContainOnly setOf(
            Cell(0, 1),
            Cell(1, 3),
            Cell(2, 0),
            Cell(3, 2)
        )
    }

    @Disabled
    @Test
    fun `this 9x9 grid should be solved`() {
        val grid9x9: IntArray = intArrayOf(
            1, 2, 2, 3, 3, 3, 2, 2, 2,
            1, 2, 2, 3, 4, 3, 2, 2, 2,
            1, 1, 2, 2, 4, 4, 2, 2, 2,
            1, 1, 1, 2, 2, 4, 2, 2, 2,
            1, 1, 5, 2, 2, 4, 2, 2, 6,
            1, 1, 5, 2, 2, 2, 2, 6, 6,
            1, 5, 5, 2, 2, 2, 7, 6, 7,
            8, 5, 8, 2, 2, 9, 7, 7, 7,
            8, 8, 8, 2, 2, 9, 9, 9, 9
        )

        val starCells = Grid(grid9x9).solve()

        starCells shouldContainOnly setOf(
            Cell(row = 7, col = 0),
            Cell(row = 6, col = 6),
            Cell(row = 1, col = 7),
            Cell(row = 5, col = 2),
            Cell(row = 4, col = 8),
            Cell(row = 0, col = 3),
            Cell(row = 8, col = 5),
            Cell(row = 2, col = 4),
            Cell(row = 3, col = 1)
        )
    }

    @Test
    fun `this 10x10 grid should not be solved with a simple CSV algorithm`() {
        val grid10x10: IntArray = intArrayOf(
            9, 9, 9, 9, 2, 5, 5, 5, 5, 5,
            4, 3, 6, 6, 2, 7, 5, 1, 1, 1,
            4, 3, 6, 6, 2, 7, 5, 5, 7, 1,
            4, 3, 6, 6, 2, 7, 7, 7, 7, 1,
            4, 4, 6, 6, 2, 4, 1, 1, 7, 1,
            4, 4, 6, 6, 2, 4, 8, 1, 1, 1,
            4, 4, 6, 6, 4, 4, 8, 8, 1, 8,
            4, 4, 4, 4, 4, 8, 8, 8, 1, 8,
            0, 0, 0, 4, 4, 8, 8, 8, 1, 8,
            0, 0, 0, 4, 4, 8, 8, 8, 8, 8
        )

        val starCells = Grid(grid10x10).solve()

        starCells shouldBe emptySet<Cell>()
        // The solution :
        // solution.starCells shouldContainOnly setOf(Cell(row=7, col=0), Cell(row=6, col=6), Cell(row=1, col=7),
        //    Cell(row=5, col=2), Cell(row=4, col=8), Cell(row=0, col=3), Cell(row=8, col=5), Cell(row=2, col=4), Cell(row=3, col=1))
    }

    @Disabled
    @Test
    fun `almost all grids, as json files in resources directory, should be solved`() {
        var totalGrid = 0
        var solvedGrid = 0
        var invalidGrid = 0
        val gridDirectory = this.javaClass.getResource("/grids").path
        File(gridDirectory).walk().forEach { file ->
            if (file.isFile) {
                try {
                    val fileText = file.readText()
                    val jsonGrid = Json.decodeFromString<JsonGrid>(fileText)
                    totalGrid++
                    try {
                        val starCells = Grid(jsonGrid.gridData).solve()
                        if (starCells.size == sqrt(jsonGrid.gridData.size.toDouble()).toInt()) {
                            solvedGrid++
                        } else {
                            println("$file can't be solved")
                        }
                    } catch (e: Error) {
                        invalidGrid++
                    }
                } catch (e: Exception) {
                    println(e)
                }
            }
        }

        val GRIDS_NOT_SOLVED = 2
        solvedGrid shouldBeGreaterThanOrEqualTo totalGrid - invalidGrid - GRIDS_NOT_SOLVED
        invalidGrid shouldBeEqual 2
    }

    @Serializable
    data class JsonGrid(val gridData: IntArray) {
        // Auto generated code: recommended by the compiler because IntArray is implemented by a java array which
        //  makes only a reference comparison
        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false

            other as JsonGrid

            return gridData.contentEquals(other.gridData)
        }

        override fun hashCode(): Int {
            return gridData.contentHashCode()
        }
    }

}