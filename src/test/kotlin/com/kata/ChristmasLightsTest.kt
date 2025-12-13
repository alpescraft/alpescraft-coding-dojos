package com.kata

import org.junit.jupiter.api.*
import org.junit.jupiter.api.Assertions.*
import com.kata.Point

internal class ChristmasLightsTest {

    @Test
    fun `should return 0 when just initialized lights`() {
        assertEquals(0, ChristmasLights().countLightsOn())
    }

    @Test
    fun `should switch on one light`() {
        val christmasLights = ChristmasLights()
        christmasLights.turnOn(Point(0, 0), Point(0, 0))
        assertEquals(1, christmasLights.countLightsOn())
    }

    @Test
    fun `should switch on one line of lights`() {
        val christmasLights = ChristmasLights()
        christmasLights.turnOn(Point(0, 0), Point(999, 0))
        assertEquals(1000, christmasLights.countLightsOn())
    }

    @Test
    fun `should switch on one column of lights`() {
        val christmasLights = ChristmasLights()
        christmasLights.turnOn(Point(0, 0), Point(0, 999))
        assertEquals(1000, christmasLights.countLightsOn())
    }

    @Test
    fun `should switch on one column of lights twice`() {
        val christmasLights = ChristmasLights()
        christmasLights.turnOn(Point(0, 0), Point(0, 999))
        christmasLights.turnOn(Point(0, 0), Point(0, 999))
        assertEquals(1000, christmasLights.countLightsOn())
    }

    @Test
    fun `should switch on a square if lights`() {
        val christmasLights = ChristmasLights()
        christmasLights.turnOn(Point(498, 499), Point(499, 500))
        assertEquals(4, christmasLights.countLightsOn())
        assertEquals(
            setOf(
                Point(498, 499),
                Point(499, 499),
                Point(498, 500),
                Point(499, 500)),
            christmasLights.getLightsOne()
        )
    }

    @Test
    fun `should switch off a square if lights`() {
        val christmasLights = ChristmasLights()
        christmasLights.turnOn(Point(498, 499), Point(499, 500))
        christmasLights.turnOff(Point(499, 500), Point(600, 502))
        assertEquals(3, christmasLights.countLightsOn())
        assertEquals(
            setOf(
                Point(498, 499),
                Point(499, 499),
                Point(498, 500)),
            christmasLights.getLightsOne()
        )
    }
}