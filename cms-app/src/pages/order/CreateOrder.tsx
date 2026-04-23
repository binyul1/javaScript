import { useState, useEffect } from "react";
import { PageTitle } from "../../components/page-title/PageTitle";
import CouponInput from "../../components/coupon/CouponInput";
import {
  LuPlus,
  LuSearch,
  LuTrash2,
  LuUser,
  LuCreditCard,
} from "react-icons/lu";
import { priceFormat } from "../../lib/utilities/helper";
import { type AppDispatch, type RootState } from "../../config/store";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../lib/reducers/product.reducer";
import type { IProductDetail } from "../products/ProductDetail";
import type { IUserDetail } from "../../types/auth-type";
import { getAllUsers } from "../../lib/reducers/user.reducer";
import type { CouponCode } from "../../data/couponCodes";

interface OrderItem {
  id: string;
  productId: number;
  productName: string;
  sku: string;
  unit: number;
  rate: number;
  total: number;
}

export default function CreateOrder() {
  const dispatch = useDispatch<AppDispatch>();

  const allProducts = useSelector((rootStore: RootState) => {
    return rootStore?.product?.allProducts as Array<IProductDetail> | null;
  });
  const allUsers = useSelector((rootStore: RootState) => {
    return rootStore?.user?.allUsers as Array<IUserDetail> | null;
  });

  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    {
      id: "1",
      productId: 0,
      productName: "",
      sku: "",
      unit: 1,
      rate: 0,
      total: 0,
    },
  ]);

  const [customerSearch, setCustomerSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<
    (typeof allUsers)[0] | null
  >(null);
  const [filteredCustomers, setFilteredCustomers] = useState<
    Array<IUserDetail>
  >([]);
  const [appliedCoupon, setAppliedCoupon] = useState<CouponCode | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [manualDiscount, setManualDiscount] = useState(0);
  const [taxRate] = useState(13); // 13% tax

  // Filter customers based on search
  useEffect(() => {
    if (allUsers) {
      const filtered = allUsers.filter(
        (customer) =>
          customer.firstName
            .toLowerCase()
            .includes(customerSearch.toLowerCase()) ||
          customer.lastName
            .toLowerCase()
            .includes(customerSearch.toLowerCase()),
      );
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers([]);
    }
  }, [customerSearch, allUsers]);

  // Calculate totals
  const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0);
  const couponDiscountAmount = couponDiscount;
  const manualDiscountAmount = (subtotal * manualDiscount) / 100;
  const totalDiscountAmount = couponDiscountAmount + manualDiscountAmount;
  const taxableAmount = subtotal - totalDiscountAmount;
  const taxAmount = (taxableAmount * taxRate) / 100;
  const grandTotal = taxableAmount + taxAmount;

  const addNewRow = () => {
    const newRow: OrderItem = {
      id: Date.now().toString(),
      productId: 0,
      productName: "",
      sku: "",
      unit: 1,
      rate: 0,
      total: 0,
    };
    setOrderItems([...orderItems, newRow]);
  };

  const updateOrderItem = (id: string, field: keyof OrderItem, value: any) => {
    setOrderItems(
      orderItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };

          // Auto-fill product details when product is selected
          if (field === "productId" && value) {
            const product = allProducts?.find((p) => p.id === value);
            if (product) {
              updatedItem.productName = product.title;
              updatedItem.sku = product.sku;
              updatedItem.rate = product.price;
            }
          }

          // Recalculate total when unit or rate changes
          if (field === "unit" || field === "rate" || field === "productId") {
            updatedItem.total = updatedItem.unit * updatedItem.rate;
          }

          return updatedItem;
        }
        return item;
      }),
    );
  };

  const removeOrderItem = (id: string) => {
    if (orderItems.length > 1) {
      setOrderItems(orderItems.filter((item) => item.id !== id));
    }
  };

  const handleCouponApplied = (
    coupon: CouponCode | null,
    discountAmount: number,
  ) => {
    setAppliedCoupon(coupon);
    setCouponDiscount(discountAmount);
  };

  const handlePlaceOrder = () => {
    console.log("Placing order:", {
      customer: selectedCustomer,
      items: orderItems,
      subtotal,
      coupon: appliedCoupon,
      couponDiscount: couponDiscountAmount,
      manualDiscount: manualDiscountAmount,
      totalDiscount: totalDiscountAmount,
      tax: taxAmount,
      total: grandTotal,
    });
  };

  const handleProceedToPay = () => {
    console.log("Proceeding to payment:", {
      customer: selectedCustomer,
      total: grandTotal,
    });
  };

  useEffect(() => {
    dispatch(getAllProducts({ limit: 198, skip: 0 }));
    dispatch(getAllUsers({ limit: 208, skip: 0 }));
  }, []);

  return (
    <div className="p-6 bg-stone-50 min-h-screen">
      <PageTitle className="text-teal-900 text-left text-3xl mb-6">
        Create New Order
      </PageTitle>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Order Items (75% width) */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase w-1/3">
                      Product
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase w-20">
                      Unit
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase w-24">
                      Rate
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase w-24">
                      Total
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase w-16">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orderItems.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="space-y-2">
                          <select
                            value={item.productId}
                            onChange={(e) =>
                              updateOrderItem(
                                item.id,
                                "productId",
                                parseInt(e.target.value),
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                          >
                            <option value={0}>Select Product</option>
                            {allProducts?.map((product) => (
                              <option key={product.id} value={product.id}>
                                {product.title} - ${product.price}
                              </option>
                            ))}
                          </select>
                          {item.sku && (
                            <div className="text-xs text-gray-500">
                              SKU: {item.sku}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="1"
                          value={item.unit}
                          onChange={(e) =>
                            updateOrderItem(
                              item.id,
                              "unit",
                              parseInt(e.target.value) || 1,
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm text-center"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.rate}
                          onChange={(e) =>
                            updateOrderItem(
                              item.id,
                              "rate",
                              parseFloat(e.target.value) || 0,
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-semibold text-gray-900">
                          {priceFormat(item.total.toFixed(2))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => removeOrderItem(item.id)}
                          disabled={orderItems.length === 1}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <LuTrash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-gray-200">
              <button
                onClick={addNewRow}
                className="flex items-center gap-2 text-teal-600 hover:text-teal-800"
              >
                <LuPlus className="w-4 h-4" />
                Add More Items
              </button>
            </div>

            <div className="border-t-2 border-gray-300 bg-gray-50">
              <div className="p-6 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold text-gray-900">
                    {priceFormat(subtotal)}
                  </span>
                </div>

                {appliedCoupon && couponDiscountAmount > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">
                        Coupon ({appliedCoupon.code}):
                      </span>
                    </div>
                    <span className="font-semibold text-green-600">
                      - {priceFormat(couponDiscountAmount.toFixed(2))}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">
                      Additional Discount (%):
                    </span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={manualDiscount}
                      onChange={(e) =>
                        setManualDiscount(parseFloat(e.target.value) || 0)
                      }
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-xs text-center"
                      placeholder="0"
                    />
                  </div>
                  {manualDiscountAmount > 0 && (
                    <span className="font-semibold text-green-600">
                      - {priceFormat(manualDiscountAmount.toFixed(2))}
                    </span>
                  )}
                </div>

                {totalDiscountAmount > 0 && (
                  <div className="flex justify-between items-center text-sm border-t border-gray-200 pt-2">
                    <span className="text-gray-600 font-medium">
                      Total Discount:
                    </span>
                    <span className="font-semibold text-green-600">
                      - {priceFormat(totalDiscountAmount.toFixed(2))}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Tax ({taxRate}%):</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {priceFormat(taxAmount.toFixed(2))}
                  </span>
                </div>

                <div className="flex justify-between items-center text-lg font-bold border-t border-gray-300 pt-3">
                  <span className="text-gray-900">Total:</span>
                  <span className="text-teal-800">
                    {priceFormat(grandTotal.toFixed(2))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Customer & Actions (25% width) */}
        <div className="lg:col-span-1 space-y-6">
          {/* Coupon Code Section */}
          <CouponInput
            subtotal={subtotal}
            onCouponApplied={handleCouponApplied}
            appliedCoupon={appliedCoupon}
            appliedDiscount={couponDiscount}
          />

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <LuUser className="w-5 h-5" />
              Customer Details
            </h3>

            <div className="mb-4">
              <label
                htmlFor="customer-search"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Search Customer
              </label>
              <div className="relative">
                <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  id="customer-search"
                  type="text"
                  placeholder="Search by name or email..."
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {filteredCustomers?.map((customer) => (
                <div
                  key={customer.id}
                  onClick={() => setSelectedCustomer(customer)}
                  className={`p-3 rounded-lg border cursor-pointer ${
                    selectedCustomer?.id === customer.id
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="font-medium text-gray-900">
                    {customer.firstName} {customer.lastName}
                  </div>
                  <div className="text-sm text-gray-500">{customer.email}</div>
                  <div className="text-sm text-gray-500">{customer.phone}</div>
                </div>
              ))}
            </div>

            {selectedCustomer && (
              <div className="mt-4 p-3 bg-teal-50 border border-teal-200 rounded-lg">
                <div className="text-sm font-medium text-teal-900">
                  Selected Customer:
                </div>
                <div className="text-sm text-teal-800">
                  {selectedCustomer.firstName} {selectedCustomer.lastName}
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Order Actions
            </h3>

            <div className="space-y-3">
              <button
                onClick={handlePlaceOrder}
                disabled={
                  !selectedCustomer ||
                  orderItems.length === 0 ||
                  grandTotal === 0
                }
                className="w-full bg-teal-800 hover:bg-teal-800/90 text-white px-4 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Place Order
              </button>

              <button
                onClick={handleProceedToPay}
                disabled={
                  !selectedCustomer ||
                  orderItems.length === 0 ||
                  grandTotal === 0
                }
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LuCreditCard className="w-5 h-5" />
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
