import kotlinx.coroutines.flow.Flow
import kotlinx.serialization.json.Json

class FakeStoreService: StoreService {
    override suspend fun getProducts(withRate: Double?): List<Product> {
        val file = FakeStoreService::class.java.getResource("/fake_store.json")
        return Json.decodeFromString<Store>(file.readText()).products
    }

    override fun getProductsAsFlow(withRate: Double?): Flow<Product> {
        TODO("Not yet implemented")
    }

}
