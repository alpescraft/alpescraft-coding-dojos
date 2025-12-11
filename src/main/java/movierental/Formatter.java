package movierental;

import java.util.List;

public interface Formatter {
    String format(String name, List<Title> titles, double totalAmount, int frequentRenterPoints);
}
