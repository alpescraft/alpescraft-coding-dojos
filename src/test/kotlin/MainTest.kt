import app.cash.turbine.test
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.test.runBlockingTest
import kotlinx.coroutines.test.runTest
import utils.DI
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.time.measureTime

class MainTest {
    @Test
    fun should_mapRessourceIntoDomainObject() {
        val product = Product(id = 123, description = "radis", type = Product.Type.Vegetable)
        val price = ProductPrice(productId = 123, price = 2.5)
        val stock = ProductStock(productId = 123, quantity = 4)

        val fullProduct = FullProduct(product, price, stock)

        assertEquals(123, fullProduct.id)
        assertEquals("radis", fullProduct.description)
        assertEquals(Product.Type.Vegetable, fullProduct.type)
        assertEquals(2.5, fullProduct.price)
        assertEquals(4, fullProduct.quantity)
    }

    @Test
    fun should_returnFullProductFlow() = runTest {
        val fullProductsRepository = FullProductsRepository(DI.productService(), DI.priceService(), DI.stockService())
        val flow:Flow<FullProduct> = fullProductsRepository.getFullProducts()
        flow.test {
            val product = this.expectMostRecentItem()
            assertEquals(50, product.id)
            this.awaitComplete()
        }
    }

    @Test
    fun should_handleProductWithoutPrice() = runTest {
        val fullProductsRepository = FullProductsRepository(
            productService = DI.badProductService(),
            priceService = DI.priceService(),
            stockService = DI.stockService()
        )
        val flow:Flow<FullProduct> = fullProductsRepository.getFullProducts()
        flow.test {
            val firstProduct = awaitItem()
            assertEquals(63, firstProduct.id)
            assertEquals(0, firstProduct.quantity)
            assertEquals(0.0, firstProduct.price)
            val product = expectMostRecentItem()
            assertEquals(50, product.id)
            awaitComplete()
        }
    }

    @Test
    fun bidon() = runBlocking {
        val fullProductsRepository = FullProductsRepository(
            productService = DI.productService(),
            priceService = DI.priceService(),
            stockService = DI.stockService()
        )
        val time = measureTime {
            val flow:Flow<FullProduct> = fullProductsRepository.getFullProducts()
            flow.test {
                expectMostRecentItem()
                awaitComplete()
            }
        }
        println(time)
    }
}
