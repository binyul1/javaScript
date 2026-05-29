"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCreateDTO = void 0;
const zod_1 = require("zod");
exports.ProductCreateDTO = zod_1.z.object({
    title: zod_1.z.string().min(2).max(200),
    description: zod_1.z
        .string()
        .min(10, "Description must be at least 10 characters")
        .max(500, "Description must not exceed 500 characters"),
    category: zod_1.z.string().nonempty(),
    price: zod_1.z.coerce.number().min(1, "Price must be at least 1"),
    discountPercentage: zod_1.z.coerce
        .number()
        .min(0, "Discount cannot be negative")
        .max(100, "Discount cannot exceed 100%")
        .optional(),
    stock: zod_1.z.coerce.number().optional(),
    tags: zod_1.z.array(zod_1.z.string().nullable()).optional(),
    brand: zod_1.z.string().optional(),
    weight: zod_1.z.coerce.number().optional(),
    dimensions: zod_1.z
        .object({
        sizes: zod_1.z.array(zod_1.z.string()).optional(),
        width: zod_1.z.coerce.number().optional(),
        height: zod_1.z.coerce.number().optional(),
        depth: zod_1.z.coerce.number().optional(),
    })
        .optional(),
    warrantyInformation: zod_1.z.string().optional(),
    shippingInformation: zod_1.z.string().optional(),
    availabilityStatus: zod_1.z
        .enum(["not available", "low stock", "available"])
        .optional()
        .default("available"),
    returnPolicy: zod_1.z.string().optional(),
    minimumOrderQuantity: zod_1.z.coerce.number().optional().default(1),
});
//# sourceMappingURL=product-request.js.map