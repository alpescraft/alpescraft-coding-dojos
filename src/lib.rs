// Remove warnings about unused code this should be removed for production use
#![allow(dead_code)]

struct Percent(f32);
impl Percent {
    fn new(value: f32) -> Percent {
        match value {
            v if v < 0.0 => panic!("negative percent"),
            v if v > 100.0 => panic!("percent too large"),
            _ => Percent(value),
        }
    }
}

fn compute_price(quantity: usize, unit_price: f32, vat: Option<Percent>) -> String {
    let vat = match vat {
        None => 0.,
        Some(Percent(0.0)) => 0.0,
        Some(v) => v.0,
    };
    let mut total_price = quantity as f32 * unit_price * (1.0 + vat / 100.0);
    if total_price > 1000.0 {
        total_price = 0.97 * total_price;
    }
    format!("{:.2} €", total_price)
}

#[cfg(test)]
mod tests {
    use super::*;
    #[allow(unused_imports)]
    use pretty_assertions::{assert_eq, assert_ne};

    #[test]
    fn test_excluding_vat() {
        // Excl. VAT: 3 items at €1.21 each + 0% ⇒ “3.63 €”
        let result = compute_price(3, 1.21, None);
        assert_eq!(result, "3.63 €");
    }

    #[test]
    fn test_including_vat5() {
        // Incl. VAT 5%: 3 items at €1.21 each + 5% ⇒ “€3.81”
        let result = compute_price(3, 1.21, Some(Percent::new(5.0)));
        assert_eq!(result, "3.81 €");
    }

    #[test]
    #[should_panic(expected = "negative percent")]
    fn test_negative_percent() {
        // Test -5 %
        Percent::new(-5.0);
    }

    #[test]
    #[should_panic(expected = "percent too large")]
    fn test_percent_too_large() {
        // Test 105 %
        Percent::new(105.0);
    }

    #[test]
    fn test_zero_percent_should_not_panic() {
        Percent::new(0.0);
    }

    #[test]
    fn test_hundred_percent_should_not_panic() {
        Percent::new(100.0);
    }

    #[test]
    fn test_discount_1000() {
        // €1000 → 3% Discount: 5 x €345.00 + 10% tax → “€1840.58”
        let result = compute_price(5, 345.0, Some(Percent::new(10.0)));
        assert_eq!(result, "1840.58 €");
    }
}
