import java.lang.String.format
import java.text.NumberFormat
import java.util.Locale
import kotlin.math.floor
import kotlin.math.max

class StatementPrinter {

    private fun format(number: Long) = NumberFormat.getCurrencyInstance(Locale.US).format(number)

    private fun formatThis(it: Triple<String,Int,Int>): String {
        return "  ${it.first}: ${format((it.second / 100).toLong())} (${it.third} seats)\n"
    }

    fun print(invoice: Invoice, plays: Map<String, Play>): String {
        var totalAmount = 0
        var volumeCredits = 0
        var result = "Statement for ${invoice.customer}\n"

        result += computeList(invoice, plays).map{formatThis(it)}.joinToString("")
        totalAmount = getTotalAmount(invoice, plays, totalAmount)
        volumeCredits = getTotalCredit(invoice, plays, volumeCredits)

        result += "Amount owed is ${format((totalAmount / 100).toLong())}\n"
        result += "You earned $volumeCredits credits\n"
        return result
    }

    private fun computeList(
        invoice: Invoice,
        plays: Map<String, Play>
    ): MutableList<Triple<String, Int, Int>> {
        var result1 = ""
        val amountList = emptyList<Triple<String, Int, Int>>().toMutableList()
        invoice.performances.forEach { perf ->
            val play = plays.getValue(perf.playID)
            var thisAmount = 0

            when (play.type) {
                "tragedy" -> {
                    thisAmount = 40000
                    if (perf.audience > 30) {
                        thisAmount += 1000 * (perf.audience - 30)
                    }
                }

                "comedy" -> {
                    thisAmount = 30000
                    if (perf.audience > 20) {
                        thisAmount += 10000 + 500 * (perf.audience - 20)
                    }
                    thisAmount += 300 * perf.audience
                }

                else -> throw Error("unknown type: {play.type}")
            }

            // print line for this order
            result1 += "  ${play.name}: ${format((thisAmount / 100).toLong())} (${perf.audience} seats)\n"
            amountList.add(Triple(play.name, thisAmount, perf.audience))
        }
        return amountList
    }

    private fun getTotalAmount(
        invoice: Invoice,
        plays: Map<String, Play>,
        totalAmount: Int
    ): Int {
        var totalAmount1 = totalAmount
        invoice.performances.forEach { perf ->
            val play = plays.getValue(perf.playID)
            var thisAmount = 0

            when (play.type) {
                "tragedy" -> {
                    thisAmount = 40000
                    if (perf.audience > 30) {
                        thisAmount += 1000 * (perf.audience - 30)
                    }
                }

                "comedy" -> {
                    thisAmount = 30000
                    if (perf.audience > 20) {
                        thisAmount += 10000 + 500 * (perf.audience - 20)
                    }
                    thisAmount += 300 * perf.audience
                }

                else -> throw Error("unknown type: {play.type}")
            }

            totalAmount1 += thisAmount
        }
        return totalAmount1
    }
    private fun getTotalCredit(
        invoice: Invoice,
        plays: Map<String, Play>,
        volumeCredits: Int
    ): Int {
        var volumeCredits1 = volumeCredits

        invoice.performances.forEach { perf ->
            val play = plays.getValue(perf.playID)
            var thisAmount: Int

            when (play.type) {
                "tragedy" -> {
                    thisAmount = 40000
                    if (perf.audience > 30) {
                        thisAmount += 1000 * (perf.audience - 30)
                    }
                }

                "comedy" -> {
                    thisAmount = 30000
                    if (perf.audience > 20) {
                        thisAmount += 10000 + 500 * (perf.audience - 20)
                    }
                    thisAmount += 300 * perf.audience
                }

                else -> throw Error("unknown type: {play.type}")
            }

            // add volume credits
            volumeCredits1 += max(perf.audience - 30, 0)
            // add extra credit for every ten comedy attendees
            if ("comedy" == play.type) volumeCredits1 += floor((perf.audience / 5).toDouble()).toInt()

        }
        return volumeCredits1
    }

}
