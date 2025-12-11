package movierental;

import java.util.List;

public class HtmlFormatter implements Formatter {
    @Override
    public String format(String name, List<Title> titles, double totalAmount, int frequentRenterPoints) {
        String result = "<h1>Rental Record for <em>" + name + "</em></h1>\n";
        result += "<table>\n";
        for (Title title : titles) {
            result += "  <tr><td>" + title.title + "</td><td>" + title.amount + "</td></tr>\n";
        }
        result += "</table>\n";
        result += "<p>Amount owed is <em>" + totalAmount + "</em></p>\n";
        result += "<p>You earned <em>" + frequentRenterPoints + "</em> frequent renter points</p>";
        return result;
    }
}
