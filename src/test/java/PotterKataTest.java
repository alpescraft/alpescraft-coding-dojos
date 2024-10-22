import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class PotterKataTest {

    @Test
    public void shouldGivePriceWithoutDiscount(){
        assertEquals(0, new PotterKata().price(new int[]{}));
        assertEquals(8, new PotterKata().price(new int[]{0}));
        assertEquals(8, new PotterKata().price(new int[]{1}));
        assertEquals(8, new PotterKata().price(new int[]{2}));
        assertEquals(8, new PotterKata().price(new int[]{3}));
        assertEquals(8, new PotterKata().price(new int[]{4}));
        assertEquals(8 * 3, new PotterKata().price(new int[]{1, 1, 1}));
    }

    @Test
    public void shouldApplyDiscountWhenTwoDifferentBooks(){
        // Given
        PotterKata potterKata = new PotterKata();
        // When
        double price = potterKata.price(new int[]{1, 2});
        // Then
        assertEquals(8 * 2 * 0.95, price);
    }

    @Test
    public void shouldApplyDiscountWhenThreeDifferentBooks(){
        // Given
        PotterKata potterKata = new PotterKata();
        // When
        double price = potterKata.price(new int[]{1, 2, 3});
        // Then
        assertEquals(8 * 3 * 0.90, price);
    }

    @Test
    public void shouldApplyDiscountWhenFourDifferentBooks(){
        // Given
        PotterKata potterKata = new PotterKata();
        // When
        double price = potterKata.price(new int[]{1, 2, 3, 4});
        // Then
        assertEquals(8 * 4 * 0.80, price);
    }

    @Test
    public  void  shouldApplyDiscountWhenFiveDifferentBooks(){
        // Given
        PotterKata potterKata = new PotterKata();
        // When
        double price = potterKata.price(new int[]{1, 2, 3, 4, 5});
        // Then
        assertEquals(8 * 5 * 0.75, price);
    }

    @Test
    public void  shouldApplyDiscountWithThreeBooksIncludingTwoDifferents(){
        // Given
        PotterKata potterKata = new PotterKata();
        // When
        double price = potterKata.price(new int[]{1, 1, 2});
        // Then
        assertEquals((8 * 2 * 0.95) + 8, price);
    }

    @Test
    public void shouldApplyDiscountCorrectlyWhen2Discounts(){
        // Given
        PotterKata potterKata = new PotterKata();
        // When
        double price = potterKata.price(new int[]{1, 1, 2, 2});
        // Then
        assertEquals((8 * 2 * 0.95) * 2, price);
    }
}