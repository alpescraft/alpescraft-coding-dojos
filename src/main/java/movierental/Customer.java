package movierental;

import java.util.ArrayList;
import java.util.List;

import static movierental.Movie.PriceCode.NEW_RELEASE;

public class Customer {

    private String _name;
    private List<Rental> _rentals = new ArrayList<Rental>();

    public Customer(String name) {
        _name = name;
    }

    public void addRental(Rental arg) {
        _rentals.add(arg);
    }

    public String statement(Formatter formatter) {
        double totalAmount = 0;
        int frequentRenterPoints = 0;
        List<Title> titles = new ArrayList<Title>();

        for (Rental each : _rentals) {
            double thisAmount = 0;

            //determine amounts for each line
            switch (each.getMovie().getPriceCode()) {
                case REGULAR:
                    thisAmount += 2;
                    if (each.getDaysRented() > 2)
                        thisAmount += (each.getDaysRented() - 2) * 1.5;
                    break;
                case NEW_RELEASE:
                    thisAmount += each.getDaysRented() * 3;
                    break;
                case CHILDRENS:
                    thisAmount +=
 1.5;
                    if (each.getDaysRented() > 3)
                        thisAmount += (each.getDaysRented() - 3) * 1.5;
                    break;
            }

            // add frequent renter points
            frequentRenterPoints++;
            // add bonus for a two day new release rental
            if ((each.getMovie().getPriceCode() == NEW_RELEASE) && each.getDaysRented() > 1)
                frequentRenterPoints++;

            // show figures for this rental
            titles.add(new Title(each.getMovie().getTitle(), thisAmount));
            totalAmount += thisAmount;
        }

        String result = formatter.format(_name, titles, totalAmount, frequentRenterPoints);

        return result;
    }

}
