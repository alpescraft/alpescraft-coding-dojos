
interface ProductService {
    suspend fun getProducts() : List<Product>
}
