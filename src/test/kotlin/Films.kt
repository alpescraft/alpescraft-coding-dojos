import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

@Serializable
data class Films(val films: List<Film>)

@Serializable
data class Film(
    @SerialName("rang") val rank: Int,
    @SerialName("titre") val title: String,
    @SerialName("réalisateur") val director: String,
    @SerialName("année de sortie") val year: Int,
    @SerialName("nationalité") val nationality: String,
    @SerialName("entrées (millions)") val entries: Int,
)

fun Any.loadFilms(): List<Film> {
    val resource = this::class.java.getResource("/meilleures_audiences_en_salles_depuis_1945.json") ?: error("Resource not found")
    val json = resource.readText()
    val jsonDecoder = Json { ignoreUnknownKeys = true }
    return jsonDecoder.decodeFromString<Films>(json).films
}