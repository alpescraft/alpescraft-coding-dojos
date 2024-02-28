import kotlinx.coroutines.flow.Flow

interface StoreService {
    suspend fun getProducts(withRate: Double? = null) : List<Product>
    fun getProductsAsFlow(withRate: Double? = null) : Flow<Product>
}
