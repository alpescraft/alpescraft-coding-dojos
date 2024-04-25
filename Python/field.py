class ShoppingCart:
    price = 0
    prices = []
 
    def __init__(self):
        self.prices = []

    '''
    the goal is to remove the field above, using a list of prices instead:
    def __init__(self):
        self.prices = []
    '''

    def add(self, price):
        self.price = price
        self.prices.append(price)
        
    def calculate_total_price_new(self):
        return sum(self.prices)

    def has_discount_new(self):
        return self.calculate_total_price_new() >= 100

    def number_of_products(self):
        return 1

    def number_of_products_new(self):
        return len(self.prices)


class SomeConsumer():
    def do_stuff(self):
        shoppingCart = ShoppingCart()
        shoppingCart.add(100)
        print("other consumer", shoppingCart.calculate_total_price_new())


if __name__ == "__main__":
    shoppingCart = ShoppingCart()
    shoppingCart.add(10)
    print("number of products:", shoppingCart.number_of_products_new())
    print("total price:", shoppingCart.calculate_total_price_new())
    print("has discount:", shoppingCart.has_discount_new())
