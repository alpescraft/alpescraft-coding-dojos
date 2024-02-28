import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.request.get
import io.ktor.client.request.post
import io.ktor.http.HttpStatusCode
import kotlinx.coroutines.flow.Flow

class HttpStoreService(private val baseURL: String, private val client: HttpClient) : StoreService {
    override suspend fun getProducts(withRate: Double?): List<Product> {
        val response = client.get("$baseURL/products")
        return when (response.status) {
            HttpStatusCode.OK -> response.body<Store>().products
            else -> throw BusinessException()
        }
    }

    override fun getProductsAsFlow(withRate: Double?): Flow<Product> {
        TODO("Not yet implemented")
    }

}
