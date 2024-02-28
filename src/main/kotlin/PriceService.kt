
interface PriceService {
    suspend fun getPriceByProductId(productId: Int): ProductPrice?
}
