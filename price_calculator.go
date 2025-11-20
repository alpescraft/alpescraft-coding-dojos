package main

import "fmt"

// PriceCalculator calculates the total price with quantity, unit price, tax and discounts
type PriceCalculator struct{}

// Calculate returns the formatted total price
func (pc *PriceCalculator) Calculate(quantity int, unitPrice float64, taxRate float64) string {
	total := float64(quantity) * unitPrice

	// Apply discount based on thresholds
	discount := 0.0
	if total >= 5000 {
		discount = 5.0
	} else if total >= 1000 {
		discount = 3.0
	}

	totalWithDiscount := total * (1 - discount/100)
	totalWithTax := totalWithDiscount * (1 + taxRate/100)
	return fmt.Sprintf("%.2f €", totalWithTax)
}
