// Remove warnings about unused code this should be removed for production use
#![allow(dead_code)]

trait Convertible {
    fn convert(&self, amount: f32) -> f32;
}

struct Krupnic;

impl Convertible for Krupnic {
    fn convert(&self, amount: f32) -> f32 {
        amount * 2.0
    }
}

struct Zorglub {
    rate: f32,
}

impl Zorglub {
    fn new(rate: f32) -> Self {
        Self { rate }
    }
}

impl Convertible for Zorglub {
    fn convert(&self, amount: f32) -> f32 {
        amount * 3.0
    }
}

fn convert(amount: impl Into<f32>, convertible: impl Convertible) -> f32  {
    convertible.convert(amount.into())
}

#[cfg(test)]
mod tests {
    use super::*;
    #[allow(unused_imports)]
    use pretty_assertions::{assert_eq, assert_ne};

    #[test]
    fn test_krupnic() {
        let result = convert(20 as u16, Krupnic);
        assert_eq!(result, 40.0);
    }
    #[test]
    fn test_zorglub() {
        let result = Zorglub::new(3.0).convert(20.0);
        assert_eq!(result, 60.0);
    }
    #[test]
    fn test_zorglub_virgule() {
        let result = Zorglub::new(3.0).convert(20.2);
        assert_eq!(result, 60.600002);
    }
}
