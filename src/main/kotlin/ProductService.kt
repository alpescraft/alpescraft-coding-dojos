interface ProductService {


    suspend fun getProducts() : List<Product>
    suspend fun getPriceByProductId(productId: Int): ProductPrice?
    suspend fun getStockByProductId(productId: Int): ProductStock?
}
