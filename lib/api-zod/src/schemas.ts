import { z } from "zod";

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  createdAt: z.string(),
});

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  price: z.string(),
  imageUrl: z.string(),
  categoryId: z.number().nullable(),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  inStock: z.boolean(),
  featured: z.boolean(),
  createdAt: z.string(),
});

export const CartItemSchema = z.object({
  id: z.number(),
  sessionId: z.string(),
  productId: z.number(),
  quantity: z.number(),
  size: z.string().nullable(),
  color: z.string().nullable(),
  createdAt: z.string(),
});

export const AddToCartSchema = z.object({
  productId: z.number(),
  quantity: z.number().int().positive(),
  size: z.string().optional(),
  color: z.string().optional(),
});

export type Category = z.infer<typeof CategorySchema>;
export type Product = z.infer<typeof ProductSchema>;
export type CartItem = z.infer<typeof CartItemSchema>;
export type AddToCart = z.infer<typeof AddToCartSchema>;
