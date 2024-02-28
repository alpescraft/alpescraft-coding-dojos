package utils

import PriceService
import Product
import ProductPrice
import ProductService
import ProductStock
import StockService
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlin.time.Duration.Companion.milliseconds

object DI { // For (Manual) Dependency Injection
    fun productService(): ProductService = FakeProductService()
    fun priceService(): PriceService = FakePriceService()
    fun stockService(): StockService = FakeStockService()
}

private class FakeProductService: ProductService {
    override suspend fun getProducts(): List<Product> {
        return FakeDataReader.readProducts()
    }
}

private class FakePriceService: PriceService, CoroutineScope by CoroutineScope(Dispatchers.IO) {
    override suspend fun getPriceByProductId(productId: Int): ProductPrice? {
        return FakeDataReader.readPrices().find { it.productId == productId }
    }
}

private class FakeStockService: StockService, CoroutineScope by CoroutineScope(Dispatchers.IO) {
    override suspend fun getStockByProductId(productId: Int): ProductStock? {
        return FakeDataReader.readStocks().find { it.productId == productId }
    }
}
