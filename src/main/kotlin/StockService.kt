
interface StockService {
    suspend fun getStockByProductId(productId: Int): ProductStock?
}
