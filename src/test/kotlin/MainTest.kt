import java.util.*
import kotlin.test.Test
import kotlin.test.assertEquals

class MainTest {
    private val films = loadFilms()

    @Test
    fun test_that_passes() {
        assert(films.isNotEmpty())
    }

    @Test
    fun should_select_top_5_films_by_rank() {
        val top5FilmsByRank: List<Film> =
            getTop5FilmsByRank(films)
        assertEquals(listOf(1, 2, 3, 4, 5),
            top5FilmsByRank.map { it.rank })
    }

    @Test
    fun should_select_top_5_film_names_by_rank() {
        val top5FilmNamesByRank: List<String> =
            getTop5FilmNamesByRank(films)
        assertEquals(
            listOf(
                "Titanic",
                "Bienvenue chez les Ch'tis",
                "Intouchables",
                "La Grande Vadrouille",
                "Autant en emporte le vent"
            ),
            top5FilmNamesByRank
        )
    }

    @Test
    fun should_select_top_5_directors_by_number_of_films() {
        val top5DirectorsByNumberOfFilms: List<String> =
            getTop5DirectorsByNumberOfFilms(films)
        assertEquals(
            listOf("W. Disney", "S. Spielberg", "G. Oury", "C. Zidi", "W. Reitherman"),
            top5DirectorsByNumberOfFilms
        )
    }

    @Test
    fun should_select_top_5_directors_and_films_by_number_of_films() {
        val result: TreeMap<String, List<Film>> =
            getTop5DirectorsByNumberOfFilmsAndFilmsSortedByRank(films)
        assertEquals(
            listOf("W. Disney", "S. Spielberg", "G. Oury", "C. Zidi", "W. Reitherman"),
            result.keys.toList()
        )
    }


}

fun getTop5FilmsByRank(films: List<Film>): List<Film> {
    return films.sortedBy { it.rank }.take(5)
}

fun getTop5FilmNamesByRank(films: List<Film>): List<String> {
    return getTop5FilmsByRank(films).map(Film::title)
}

fun getTop5DirectorsByNumberOfFilms(films: List<Film>): List<String> {
    return films
        .groupBy { it.director }
        .mapValues { (_, films) -> films.count() }
        .toList()
        .sortedByDescending { (_, filmCount) -> filmCount }
        .take(5)
        .map { (director, _) -> director }
}

fun getTop5DirectorsByNumberOfFilmsAndFilmsSortedByRank(films: List<Film>): TreeMap<String, List<Film>> {
    TODO("Not implemented yet.")
}