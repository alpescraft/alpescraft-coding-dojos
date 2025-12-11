package movierental;

import java.util.List;

public class RawFormatter implements Formatter {

    @Override
    public String format(String name, List<Title> titles, double totalAmount, int frequentRenterPoints) {
        String result = "Rental Record for " + name + "\n";
        for (Title title : titles) {
            result += "\t" + title.title + "\t" + title.amount + "\n";
        }
        result += "Amount owed is " + totalAmount + "\n";
        result += "You earned " + frequentRenterPoints + " frequent renter points";
        return result;
    }
}