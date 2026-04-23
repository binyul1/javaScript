# Coupon Code System & Manual Discounts

This document explains how the coupon code system and manual discount functionality work in the CMS application.

## Files

### `src/data/couponCodes.ts`

Contains all coupon code definitions and helper functions.

### `src/components/coupon/CouponInput.tsx`

React component for entering and applying coupon codes.

### `src/pages/order/CreateOrder.tsx`

Main order creation component with both coupon and manual discount functionality.

## Discount System Overview

The application supports two types of discounts that can be used together:

1. **Coupon Code Discounts**: Pre-defined promotional codes with specific rules
2. **Manual Discounts**: Percentage-based discounts entered directly by staff

## Coupon Code Structure

Each coupon code has the following properties:

```typescript
interface CouponCode {
  code: string; // The coupon code (e.g., "WELCOME10")
  discountType: "percentage" | "fixed"; // Type of discount
  discountValue: number; // Discount amount (percentage or fixed amount)
  description: string; // Description of the coupon
  isActive: boolean; // Whether the coupon is active
  expiryDate?: Date; // Optional expiry date
  minimumOrderAmount?: number; // Minimum order amount required
  maximumDiscount?: number; // Maximum discount amount (for percentage coupons)
}
```

## Available Coupon Codes

- **WELCOME10**: 10% off for new customers (minimum $50 order)
- **SAVE20**: 20% off on orders above $100 (max $50 discount)
- **FLAT15**: $15 off on any order
- **SUMMER50**: 50% off (max $100 discount, expires Aug 31, 2026)
- **FIRSTORDER**: 15% off on first order

## Manual Discount Feature

- **Location**: Available in the bill summary section of order creation
- **Type**: Percentage-based discount (0-100%)
- **Calculation**: Applied to the subtotal before tax calculation
- **Combination**: Can be used together with coupon codes
- **Display**: Shows both individual and total discount amounts

## How the Combined Discount System Works

1. **Coupon Application**:
   - User enters a coupon code in the CouponInput component
   - System validates the code and checks conditions (active status, minimum order, expiry)
   - If valid, calculates the discount amount based on coupon type

2. **Manual Discount**:
   - Staff enters a percentage discount in the bill summary
   - Applied as a percentage of the subtotal

3. **Combined Calculation**:
   - Both discounts are calculated separately
   - Total discount = Coupon discount + Manual discount
   - Tax is calculated on (Subtotal - Total discount)
   - Final total = Taxable amount + Tax

4. **Display**:
   - Shows applied coupon with description and discount amount
   - Shows manual discount input and calculated amount
   - Displays total discount amount
   - Shows final order total

## Usage in CreateOrder Component

The discount system integrates with the order creation process:

- **Coupon input** is shown in the right sidebar
- **Manual discount input** is available in the bill summary
- Applied discounts are displayed in the bill summary
- Discount information is included in the order data when placing orders
- Both discount types can be used simultaneously

The coupon system integrates with the order creation process:

- Coupon input is shown in the right sidebar
- Applied coupons are displayed in the bill summary
- Discount is automatically calculated and applied to the order total
- Coupon information is included in the order data when placing orders

## Adding New Coupons

To add new coupon codes:

1. Add the coupon object to the `COUPON_CODES` array in `src/data/couponCodes.ts`
2. Set appropriate properties (code, discount type, value, conditions)
3. The system will automatically pick up the new coupon

## Validation Rules

- Coupon codes are case-insensitive
- Only active coupons can be applied
- Minimum order amount requirements are enforced
- Maximum discount limits are applied for percentage coupons
- Expiry dates are checked (if set)
