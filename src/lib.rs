// Remove warnings about unused code this should be removed for production use
#![allow(dead_code)]

struct Percent(f32);
impl Percent {
    fn new(value: f32) -> Percent {
        Percent(value)
    }
}

fn compute_price(quantity: usize, unit_price: f32, vat: Option<Percent>) -> String {
    let vat = match vat {
        None => 0.,
        Some(Percent(0.0)) => 0.0,
        Some(v) => v.0,
    };
    let total_price = quantity as f32 * unit_price * (1.0 + vat / 100.0);
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
}
