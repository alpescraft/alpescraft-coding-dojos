import org.example.Article
import org.example.Percentage
import org.example.Quantity
import org.example.calculateAndFormat
import org.example.percent
import kotlin.test.Test
import kotlin.test.assertEquals

class MainTest {
    @Test
    fun `should calculate price`() {
        assertEquals("3,63 €", calculateAndFormat(Article(1.21), Quantity(3)))
    }

    @Test
    fun `should calculate price with 5 percent tax`() {
        // avec taxe de 5% => 3 x 1.21 + 5% = 3.8115
        assertEquals("3,81 €", calculateAndFormat(Article(1.21), Quantity(3), Percentage(5)))
    }

    @Test
    fun `should calculate price with 20 percent tax`() {
        // avec taxe de 20% => 3 x 1.21 + 20% = 4,356
        assertEquals("4,36 €", calculateAndFormat(Article(1.21), Quantity(3), Percentage(20)))
    }

    @Test
    fun `should calculate discount over 1000`() {
        // Over 1000€, 3% discount
        // 5 * 345 + 10% = 1840,58
        assertEquals("1840,58 €", calculateAndFormat(Article(345.0), Quantity(5), 10.percent))
    }


}