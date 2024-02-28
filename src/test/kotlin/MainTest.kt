import app.cash.turbine.test
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.test.runTest
import kotlin.test.Test
import kotlin.test.assertEquals

class MainTest {
    @Test
    fun should_populate_product_cache() = runTest {
        val productCache = ProductCache(FakeProductService())
        val products: StateFlow<List<Product>> = productCache.state
        productCache.refresh()
        products.test {
            val productsList = awaitItem()
            assertEquals(50, productsList.size)
            assertEquals("Apples", productsList.first().description)
            expectNoEvents()
        }
    }

    @Test
    fun should_call_service_only_once() = runTest {
        val productService = FakeProductService()
        val productCache = ProductCache(productService)
        productCache.state.test { // Client / Consommateur
            awaitItem()
        }
        productCache.state.test {
            awaitItem()
        }
        productCache.refresh()
        productCache.refresh()
        assertEquals(1, productService.callCount)
    }
}
