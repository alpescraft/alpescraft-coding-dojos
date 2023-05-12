using FluentAssertions;
using Xunit;

namespace kata;

public class Tests
{
    private const decimal DiscountOver1000 = 0.03M;
    private const decimal DiscountOver5000 = 0.05M;

    public static string ComputeDisplayPrice(int quantity, decimal unitPrice, decimal tax)
    {
        var price = quantity * unitPrice * (1 + tax);
        if (price >= 5_000)
        {
            price *= (1 - DiscountOver5000);           
        }
        else if (price >= 1_000)
        {
            price *= (1 - DiscountOver1000);           
        }

        return Math.Round(price, 2) + " €";
    }
    
    [Fact(DisplayName = "3 articles à 1,21 € et taxe 0 % → “3.63 €”")]
    public void BasicTest()
    {
        var actual = ComputeDisplayPrice(3,1.21M,0);
        actual.Should().Be("3.63 €");
    }
    
    [Theory]
    [InlineData(3, 1.21, 0, "3.63 €")]
    [InlineData(4, 1.21, 0, "4.84 €")]
    public void Test_without_tax(int quantity, decimal unitPrice, decimal tax, string result)
    {
        var actual = ComputeDisplayPrice(quantity,unitPrice,tax);
        actual.Should().Be(result);
    }
    
    [Fact(DisplayName = "4 articles à 1,21 € et taxe 0 % → “4.84 €”")]
    public void BasicTest2()
    {
        var actual = ComputeDisplayPrice(4,1.21M,0);
        actual.Should().Be("4.84 €");
    }
    
    [Fact(DisplayName = "4 articles à 1,11 € et taxe 0 % → “4.44 €”")]
    public void BasicTest3()
    {
        var actual = ComputeDisplayPrice(4,1.11M,0);
        actual.Should().Be("4.44 €");
    }
    
    [Fact(DisplayName = "3 articles à 1,21 € et taxe 5 % → “3.81 €”")]
    public void BasicTest4()
    {
        var actual = ComputeDisplayPrice(3,1.21M,0.05M);
        actual.Should().Be("3.81 €");
    }
    
    [Fact(DisplayName = "3 articles à 1,21 € et taxe 20 % → “4.36 €”")]
    public void BasicTest5()
    {
        var actual = ComputeDisplayPrice(3,1.21M,0.2M);
        actual.Should().Be("4.36 €");
    }
    
    [Fact(DisplayName = "5 articles à 345,00 € et taxe 10 % → “1840.58 €”")]
    public void BasicTest6()
    {
        var actual = ComputeDisplayPrice(5,345M,0.1M);
        actual.Should().Be("1840.58 €");
    }    
    [Fact(DisplayName = "5 x 1299,00 € + taxe 10% → “6787.28 €”")]
    public void BasicTest7()
    {
        var actual = ComputeDisplayPrice(5,1299.00M,0.1M);
        actual.Should().Be("6787.28 €");
    }
}
