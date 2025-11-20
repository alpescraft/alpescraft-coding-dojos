package main

import "testing"

func TestPriceCalculator_Calculate(t *testing.T) {
	pc := &PriceCalculator{}

	tests := []struct {
		name      string
		quantity  int
		unitPrice float64
		taxRate   float64
		expected  string
	}{
		{"3 articles at 1.21€, no tax", 3, 1.21, 0, "3.63 €"},
		{"3 articles at 1.21€, 5% tax", 3, 1.21, 5, "3.81 €"},
		{"3 articles at 1.21€, 20% tax", 3, 1.21, 20, "4.36 €"},
		{"5 articles at 345€, 10% tax with 3% discount", 5, 345.00, 10, "1840.58 €"},
		{"5 articles at 1299€, 10% tax with 5% discount", 5, 1299.00, 10, "6787.28 €"},
	}

	for _, testCase := range tests {
		t.Run(testCase.name, func(t *testing.T) {
			result := pc.Calculate(testCase.quantity, testCase.unitPrice, testCase.taxRate)
			if result != testCase.expected {
				t.Errorf("[%s] Calculate(%d, %.2f, %.0f%%) = %v, want %v",
					testCase.name, testCase.quantity, testCase.unitPrice, testCase.taxRate, result, testCase.expected)
			}
		})
	}
}