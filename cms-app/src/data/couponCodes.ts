// Coupon codes data
export interface CouponCode {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  description: string;
  isActive: boolean;
  expiryDate?: Date;
  minimumOrderAmount?: number;
  maximumDiscount?: number;
}

export const COUPON_CODES: CouponCode[] = [
  {
    code: "WELCOME10",
    discountType: "percentage",
    discountValue: 10,
    description: "Welcome discount for new customers",
    isActive: true,
    minimumOrderAmount: 50,
  },
  {
    code: "SAVE20",
    discountType: "percentage",
    discountValue: 20,
    description: "20% off on orders above $100",
    isActive: true,
    minimumOrderAmount: 100,
    maximumDiscount: 50,
  },
  {
    code: "FLAT15",
    discountType: "fixed",
    discountValue: 15,
    description: "$15 off on any order",
    isActive: true,
  },
  {
    code: "SUMMER50",
    discountType: "percentage",
    discountValue: 50,
    description: "Summer special - 50% off",
    isActive: true,
    maximumDiscount: 100,
    expiryDate: new Date("2026-08-31"),
  },
  {
    code: "FIRSTORDER",
    discountType: "percentage",
    discountValue: 15,
    description: "15% off on first order",
    isActive: true,
  },
];

// Helper function to find a coupon by code
export const findCouponByCode = (code: string): CouponCode | null => {
  const coupon = COUPON_CODES.find(
    (coupon) =>
      coupon.code.toUpperCase() === code.toUpperCase() && coupon.isActive,
  );
  return coupon || null;
};

// Helper function to calculate discount amount
export const calculateCouponDiscount = (
  coupon: CouponCode,
  subtotal: number,
): number => {
  if (!coupon.isActive) return 0;

  // Check minimum order amount
  if (coupon.minimumOrderAmount && subtotal < coupon.minimumOrderAmount) {
    return 0;
  }

  let discountAmount = 0;

  if (coupon.discountType === "percentage") {
    discountAmount = (subtotal * coupon.discountValue) / 100;
  } else if (coupon.discountType === "fixed") {
    discountAmount = coupon.discountValue;
  }

  // Apply maximum discount limit if set
  if (coupon.maximumDiscount && discountAmount > coupon.maximumDiscount) {
    discountAmount = coupon.maximumDiscount;
  }

  return discountAmount;
};
