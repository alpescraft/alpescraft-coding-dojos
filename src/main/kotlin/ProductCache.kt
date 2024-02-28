import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update

class ProductCache(private val productService: ProductService) {
    private val _state = MutableStateFlow(emptyList<Product>()) // Crée un MutableStateFlow avec une valeur initiale de 0
    public val state = _state.asStateFlow() // Expose le MutableStateFlow en tant que StateFlow

    suspend fun refresh() {
        if (_state.value.isEmpty()) {
            _state.update {
                productService.getProducts()
            }
        }
    }
}
