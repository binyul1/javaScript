import React, { useState, useEffect } from "react";
import { PageTitle } from "../../components/page-title/PageTitle";
import { SubmitButton, CancelButton } from "../../components/buttons/Button";
import {
  LuPlus,
  LuSearch,
  LuTrash2,
  LuUser,
  LuCreditCard,
} from "react-icons/lu";

// Mock product data
const mockProducts = [
  {
    id: 1,
    title: "Powder Canister",
    price: 14.99,
    sku: "BEA-VEL-POW-003",
    stock: 89,
  },
  {
    id: 2,
    title: "Red Lipstick",
    price: 12.99,
    sku: "BEA-CHI-LIP-004",
    stock: 91,
  },
  {
    id: 3,
    title: "Wireless Headphones",
    price: 89.99,
    sku: "ELE-WIR-HEA-001",
    stock: 45,
  },
  {
    id: 4,
    title: "Smart Watch",
    price: 199.99,
    sku: "ELE-SMA-WAT-002",
    stock: 23,
  },
  {
    id: 5,
    title: "Gaming Mouse",
    price: 29.99,
    sku: "ELE-GAM-MOU-003",
    stock: 67,
  },
];

// Mock customer data
const mockCustomers = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "+1234567890" },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1234567891",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "+1234567892",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    phone: "+1234567893",
  },
];

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
    (typeof mockCustomers)[0] | null
  >(null);
  const [filteredCustomers, setFilteredCustomers] = useState(mockCustomers);
  const [discount, setDiscount] = useState(0);
  const [taxRate, setTaxRate] = useState(13); // 13% tax

  // Filter customers based on search
  useEffect(() => {
    const filtered = mockCustomers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
        customer.email.toLowerCase().includes(customerSearch.toLowerCase()),
    );
    setFilteredCustomers(filtered);
  }, [customerSearch]);

  // Calculate totals
  const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0);
  const discountAmount = (subtotal * discount) / 100;
  const taxableAmount = subtotal - discountAmount;
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
            const product = mockProducts.find((p) => p.id === value);
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

  const handlePlaceOrder = () => {
    console.log("Placing order:", {
      customer: selectedCustomer,
      items: orderItems,
      subtotal,
      discount: discountAmount,
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

  return (
    <div className="p-6 bg-stone-50 min-h-screen">
      <div className="mb-6">
        <PageTitle className="text-teal-900 text-left text-3xl">
          Create New Order
        </PageTitle>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Order Items (75% width) */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Order Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/3">
                      Product
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-20">
                      Unit
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-24">
                      Rate
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-24">
                      Total
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-16">
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
                            {mockProducts.map((product) => (
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
                        <div className="flex items-center">
                          <span className="text-gray-500 mr-1">$</span>
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
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-semibold text-gray-900">
                          ${item.total.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => removeOrderItem(item.id)}
                          disabled={orderItems.length === 1}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Remove Item"
                        >
                          <LuTrash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add More Button */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={addNewRow}
                className="flex items-center gap-2 text-teal-600 hover:text-teal-800 font-medium transition-colors duration-200"
              >
                <LuPlus className="w-4 h-4" />
                Add More Items
              </button>
            </div>

            {/* Bill Footer */}
            <div className="border-t-2 border-gray-300 bg-gray-50">
              <div className="p-6 space-y-3">
                {/* Subtotal */}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold text-gray-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {/* Discount */}
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Discount (%):</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={discount}
                      onChange={(e) =>
                        setDiscount(parseFloat(e.target.value) || 0)
                      }
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-xs text-center"
                    />
                  </div>
                  <span className="font-semibold text-green-600">
                    -${discountAmount.toFixed(2)}
                  </span>
                </div>

                {/* Tax */}
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Tax ({taxRate}%):</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    ${taxAmount.toFixed(2)}
                  </span>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center text-lg font-bold border-t border-gray-300 pt-3">
                  <span className="text-gray-900">Total:</span>
                  <span className="text-teal-800">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Customer & Actions (25% width) */}
        <div className="lg:col-span-1 space-y-6">
          {/* Customer Selection */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <LuUser className="w-5 h-5" />
              Customer Details
            </h3>

            {/* Customer Search */}
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

            {/* Customer List */}
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  onClick={() => setSelectedCustomer(customer)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedCustomer?.id === customer.id
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="font-medium text-gray-900">
                    {customer.name}
                  </div>
                  <div className="text-sm text-gray-500">{customer.email}</div>
                  <div className="text-sm text-gray-500">{customer.phone}</div>
                </div>
              ))}
            </div>

            {/* Selected Customer Display */}
            {selectedCustomer && (
              <div className="mt-4 p-3 bg-teal-50 border border-teal-200 rounded-lg">
                <div className="text-sm font-medium text-teal-900">
                  Selected Customer:
                </div>
                <div className="text-sm text-teal-800">
                  {selectedCustomer.name}
                </div>
                <div className="text-sm text-teal-700">
                  {selectedCustomer.email}
                </div>
              </div>
            )}
          </div>

          {/* Order Actions */}
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
                className="w-full bg-teal-800 hover:bg-teal-800/90 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
