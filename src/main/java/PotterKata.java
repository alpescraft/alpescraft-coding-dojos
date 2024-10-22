import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class PotterKata {
    Map<Integer, Double> discountRates = new HashMap<Integer, Double>();
    final static int BOOK_PRICE = 8;

    public PotterKata(){
        discountRates.put(0, 0.0);
        discountRates.put(1, 1.0);
        discountRates.put(2, 0.95);
        discountRates.put(3, 0.90);
        discountRates.put(4, 0.80);
        discountRates.put(5, 0.75);
    }
    public double price(int[] books) {
        var x = new HashMap<Integer, Integer>();
        for (int book : books) {
            if (x.containsKey(book)) {
                x.put(book, x.get(book) + 1);
            } else {
                x.put(book, 1);
            }
        }
        double totalPrice = 0.0;
        while (x.values().stream().filter(integer -> integer != 0).count() != 0) {
            int differentBooks =  (int)x.values().stream().filter(integer -> integer != 0).count();

            double discount = this.discountRates.get(differentBooks);
            double discountedBooksPrice = BOOK_PRICE * differentBooks * discount;

            totalPrice += discountedBooksPrice;

            for (int key : x.keySet()){
                Integer newValue = x.get(key) - 1;
                if( newValue >= 0){
                    x.put(key, newValue);
                }
            }
        }
        return totalPrice;
    }


}
