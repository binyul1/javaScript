import { z } from "zod";

export const ProductCreateDTO = z.object({
  title: z.string().min(2).max(200),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters"),

  category: z.string().nonempty(),

  price: z.coerce.number().min(1, "Price must be at least 1"),

  discountPercentage: z.coerce
    .number()
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot exceed 100%")
    .optional(),

  stock: z.coerce.number().optional(),

  tags: z.array(z.string().nullable()).optional(),

  brand: z.string().optional(),

  weight: z.coerce.number().optional(),

  dimensions: z
    .object({
      sizes: z.array(z.string()).optional(),
      width: z.coerce.number().optional(),
      height: z.coerce.number().optional(),
      depth: z.coerce.number().optional(),
    })
    .optional(),

  warrantyInformation: z.string().optional(),

  shippingInformation: z.string().optional(),

  availabilityStatus: z
    .enum(["not available", "low stock", "available"])
    .optional()
    .default("available"),

  returnPolicy: z.string().optional(),

  minimumOrderQuantity: z.coerce.number().optional().default(1),
});

export type IProductCreateRequest = z.infer<typeof ProductCreateDTO>;
