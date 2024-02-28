import io.ktor.client.HttpClient
import io.ktor.client.engine.mock.MockEngine
import io.ktor.client.engine.mock.respond
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.http.HttpHeaders
import io.ktor.http.HttpMethod
import io.ktor.http.HttpStatusCode
import io.ktor.http.headersOf
import io.ktor.serialization.kotlinx.json.json
import io.ktor.utils.io.ByteReadChannel
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.test.runTest
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith

class SomeTest {
    @Test
    fun `should return a product list`() = runBlocking {
        val products = FakeStoreService().getProducts()
        assertEquals(20, products.size)
        assertEquals(
            Product(
                id = 4,
                title = "Mens Casual Slim Fit",
                price = 15.99,
                description = "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
                category = "men's clothing",
                image = "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
                rating = Rating(
                    rate = 2.1,
                    count = 430
                )
            ), products[3]
        )
    }

    @Test
    fun `should return a real product list`() = runTest {
        val mockOk = MockEngine { request ->
            if (request.url.toString() == "https://monservice/products" && request.method == HttpMethod.Get) {
                respond(
                    content = ByteReadChannel(FakeStoreService::class.java.getResource("/fake_store.json").readText()),
                    status = HttpStatusCode.OK,
                    headers = headersOf(HttpHeaders.ContentType, "application/json")
                )
            } else {
                respond(
                    content = ByteReadChannel.Empty,
                    status = HttpStatusCode.Forbidden,
                )
            }
        }

        val client = HttpClient(mockOk) {
            install(ContentNegotiation) { json() }
        }

        val products = HttpStoreService("https://monservice", client).getProducts()
        assertEquals(20, products.size)
        assertEquals(
            Product(
                id = 4,
                title = "Mens Casual Slim Fit",
                price = 15.99,
                description = "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
                category = "men's clothing",
                image = "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
                rating = Rating(
                    rate = 2.1,
                    count = 430
                )
            ), products[3]
        )
    }

    @Test
    fun `should throw exception`() = runTest {
        val mockOk = MockEngine {
            respond(
                content = ByteReadChannel.Empty,
                status = HttpStatusCode.Forbidden,
            )
        }

        val client = HttpClient(mockOk) {
            install(ContentNegotiation) { json() }
        }

        assertFailsWith<BusinessException> { HttpStoreService("https://monservice", client).getProducts() }
    }
}
