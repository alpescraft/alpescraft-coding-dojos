package org.example

fun calculateAndFormat(
    article: Article,
    quantity: Quantity,
    tax: Percentage = Percentage.Default
): String {
    var priceBeforeTax = quantity.value * article.unitPrice
    if (priceBeforeTax > 1000) {
        priceBeforeTax *= 0.97
    }
    val price = priceBeforeTax * (1 + tax.value / 100.0)

    return "%.2f €".format(price)
}

data class Article(val unitPrice: Double)

@JvmInline
value class Percentage(val value: Int) {
    companion object {
        val Default = Percentage(0)
    }
}

val Int.percent get() = Percentage(this)

@JvmInline
value class Quantity(val value: Int)
