import kotlin.test.Test

class MainTest {
    private val films = loadFilms()

    @Test
    fun test_that_passes() {
        assert(films.isNotEmpty())
    }
}
