import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow

class FullProductsRepository(
    private val productService: ProductService,
    private val priceService: PriceService,
    private val stockService: StockService
) {

    fun getFullProducts(): Flow<FullProduct> = flow {
        val products = productService.getProducts()
        products.forEach {
            val price = priceService.getPriceByProductId(it.id)
            val stock = stockService.getStockByProductId(it.id)

            if (price == null || stock == null) {
                emit(FullProduct(it, ProductPrice(it.id, 0.0), ProductStock(it.id, 0)))
            } else {
                emit(FullProduct(it, price, stock))
            }
        }
    }

}
