data class FullProduct(val product: Product, val productPrice: ProductPrice, val productStock: ProductStock)
{
    val id get() = product.id
    val description get() = product.description
    val type get() = product.type
    val price get() = productPrice.price
    val quantity get() = productStock.quantity
}
