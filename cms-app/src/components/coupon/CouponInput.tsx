import { useState } from "react";
import { LuTag, LuCheck, LuX } from "react-icons/lu";
import {
  findCouponByCode,
  calculateCouponDiscount,
  type CouponCode,
} from "../../data/couponCodes";

interface CouponInputProps {
  subtotal: number;
  onCouponApplied: (coupon: CouponCode | null, discountAmount: number) => void;
  appliedCoupon: CouponCode | null;
  appliedDiscount: number;
}

export default function CouponInput({
  subtotal,
  onCouponApplied,
  appliedCoupon,
  appliedDiscount,
}: CouponInputProps) {
  const [couponCode, setCouponCode] = useState("");
  const [error, setError] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setError("Please enter a coupon code");
      return;
    }

    setIsValidating(true);
    setError("");

    // Simulate API call delay
    setTimeout(() => {
      const coupon = findCouponByCode(couponCode.trim());

      if (!coupon) {
        setError("Invalid or expired coupon code");
        setIsValidating(false);
        return;
      }

      const discountAmount = calculateCouponDiscount(coupon, subtotal);

      if (discountAmount === 0) {
        if (coupon.minimumOrderAmount && subtotal < coupon.minimumOrderAmount) {
          setError(
            `Minimum order amount of $${coupon.minimumOrderAmount} required`,
          );
        } else {
          setError("Coupon cannot be applied to this order");
        }
        setIsValidating(false);
        return;
      }

      onCouponApplied(coupon, discountAmount);
      setCouponCode("");
      setIsValidating(false);
    }, 500);
  };

  const handleRemoveCoupon = () => {
    onCouponApplied(null, 0);
    setCouponCode("");
    setError("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleApplyCoupon();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <LuTag className="w-5 h-5" />
        Coupon Code
      </h3>

      {appliedCoupon ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <LuCheck className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-medium text-green-900">
                  {appliedCoupon.code}
                </div>
                <div className="text-sm text-green-700">
                  {appliedCoupon.description}
                </div>
              </div>
            </div>
            <button
              onClick={handleRemoveCoupon}
              className="text-red-600 hover:text-red-800 p-1"
              title="Remove coupon"
            >
              <LuX className="w-4 h-4" />
            </button>
          </div>
          <div className="text-sm text-gray-600">
            Discount applied:{" "}
            <span className="font-semibold text-green-600">
              ${appliedDiscount.toFixed(2)}
            </span>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm uppercase"
              disabled={isValidating}
            />
            <button
              onClick={handleApplyCoupon}
              disabled={isValidating || !couponCode.trim()}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isValidating ? "Applying..." : "Apply"}
            </button>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
              {error}
            </div>
          )}

          <div className="text-xs text-gray-500">
            Enter a valid coupon code to get discount on your order
          </div>
        </div>
      )}
    </div>
  );
}
