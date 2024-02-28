import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable data class Product(
    val id: Int,
    val description: String,
    val type: Type
) {
    @Serializable
    enum class Type {
        @SerialName("fruit") Fruit,
        @SerialName("vegetable") Vegetable
    }
}

@Serializable data class ProductPrice(
    @SerialName("id") val productId: Int,
    @SerialName("value") val price: Double
)

@Serializable data class ProductStock(
    @SerialName("id") val productId: Int,
    val quantity: Int
)
