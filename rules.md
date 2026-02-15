# Lift Pass Pricing - Domain Rules

This document describes the business rules for calculating lift pass prices.

## Input Parameters

- **type**: Type of lift pass (e.g., "1jour", "night")
- **age**: Age of the skier (optional)
- **date**: Date of skiing (optional, format: YYYY-MM-DD)

## Base Pricing

Each lift pass type has a base cost stored in the database (`base_price` table).

## Age-Based Rules

### Children Under 6
- **Rule**: Children under 6 years old ski for free
- **Cost**: 0
- **Applies to**: All pass types

### Children Under 15 (Non-Night Passes)
- **Rule**: Children under 15 get a 30% discount
- **Calculation**: `base_cost × 0.7`
- **Applies to**: Day passes only (not night passes)

### Seniors Over 64
- **Non-night passes**: 25% discount → `base_cost × 0.75`
  - Also subject to date-based reductions (Monday discount)
- **Night passes**: 60% discount → `base_cost × 0.4`

### Adults (15-64 years)
- **Cost**: Base cost for night passes
- **Cost**: Base cost with potential date-based reductions for non-night passes

## Date-Based Rules (Non-Night Passes Only)

### Monday Discount
- **Rule**: Non-holiday Mondays get a 35% discount
- **Calculation**: Applied after age-based discounts
- **Formula**: `(base_cost or age_discounted_cost) × (1 - 0.35)`
- **Condition**: Only if the date is a Monday AND not a holiday

### Holidays
- **Rule**: No Monday discount on holidays
- **Data**: Holiday dates are stored in the `holidays` table

## Pass Type Rules

### Night Passes
- Children under 6: Free (cost = 0)
- Seniors over 64: 60% discount (cost × 0.4)
- Others (6-64): Base cost
- **Note**: No date-based discounts apply to night passes

### Day Passes (Non-Night)
- Subject to both age-based and date-based discounts
- Discounts can stack: age discount first, then date discount

## Calculation Order

1. Check if age < 6 → return 0
2. For **night passes**:
   - If age > 64 → apply 60% discount
   - Otherwise → return base cost
3. For **non-night passes**:
   - Check if date is a non-holiday Monday → set 35% reduction
   - Apply age-based pricing:
     - Age < 15 → 30% discount
     - Age > 64 → 25% discount + Monday reduction
     - Age 15-64 or undefined → base cost + Monday reduction

## Price Rounding

All final prices are rounded up using `Math.ceil()`.

## TODO / Known Gaps

- Line 54 comment: "TODO apply reduction for others" - suggests incomplete implementation of reductions
