import kotlinx.coroutines.time.delay
import java.sql.RowId
import kotlin.time.Duration.Companion.seconds
import kotlin.time.toJavaDuration

class FakeProductService: ProductService {
    var callCount: Int =0
        private set
    override suspend fun getProducts(): List<Product> {
        callCount++
        return FakeDataReader.readProducts()
    }
    override suspend fun getPriceByProductId(productId: Int): ProductPrice? {
        delay(2.seconds.toJavaDuration())  // Simulate network delay
        return FakeDataReader.readPrices().find { it.productId == productId }
    }
    override suspend fun getStockByProductId(productId: Int): ProductStock? {
        delay(1.seconds.toJavaDuration())  // Simulate network delay
        return FakeDataReader.readStocks().find { it.productId == productId }
    }
}
