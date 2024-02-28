package utils

import Product
import ProductPrice
import ProductStock
import kotlinx.serialization.json.Json

object FakeDataReader {
    fun readProducts() : List<Product> {
        val json = readFile("fake_products.json")
        return Json.decodeFromString<List<Product>>(json)
    }

    fun readPrices() : List<ProductPrice> {
        val json = readFile("fake_prices.json")
        return Json.decodeFromString<List<ProductPrice>>(json)
    }

    fun readStocks() : List<ProductStock> {
        val json = readFile("fake_stocks.json")
        return Json.decodeFromString<List<ProductStock>>(json)
    }

    private fun readFile(name: String): String {
        val file = FakeDataReader::class.java.getResource("/$name")
        return file?.readText().orEmpty()
    }
}