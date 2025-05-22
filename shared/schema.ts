import { z } from "zod";

// Categories
export const categories = {
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  parentId: z.number().optional(),
  createdAt: z.date()
};

export type Category = z.infer<typeof z.object(categories)>;
export type InsertCategory = Omit<Category, "id" | "createdAt">;

// Products
export const products = {
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  price: z.number(),
  salePrice: z.number().optional(),
  imageUrl: z.string(),
  categoryId: z.number(),
  inStock: z.boolean(),
  isFeatured: z.boolean(),
  woodType: z.string(),
  dimensions: z.string(),
  weight: z.number(),
  rating: z.number(),
  reviewCount: z.number(),
  createdAt: z.date()
};

export type Product = z.infer<typeof z.object(products)>;
export type InsertProduct = Omit<Product, "id" | "createdAt">;

// Cart Items
export const cartItems = {
  id: z.number(),
  productId: z.number(),
  quantity: z.number(),
  addedAt: z.date()
};

export type CartItem = z.infer<typeof z.object(cartItems)>;
export type InsertCartItem = Omit<CartItem, "id" | "addedAt">;

// Orders
export const orders = {
  id: z.number(),
  totalAmount: z.number(),
  status: z.enum(["pending", "processing", "shipped", "delivered", "cancelled"]),
  shippingAddress: z.string(),
  shippingCity: z.string(),
  shippingState: z.string(),
  shippingZipCode: z.string(),
  createdAt: z.date()
};

export type Order = z.infer<typeof z.object(orders)>;
export type InsertOrder = Omit<Order, "id" | "createdAt">;

// Order Items
export const orderItems = {
  id: z.number(),
  orderId: z.number(),
  productId: z.number(),
  quantity: z.number(),
  priceAtPurchase: z.number()
};

export type OrderItem = z.infer<typeof z.object(orderItems)>;
export type InsertOrderItem = Omit<OrderItem, "id">;

// Testimonials
export const testimonials = {
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  rating: z.number().min(1).max(5),
  comment: z.string(),
  isApproved: z.boolean(),
  createdAt: z.date()
};

export type Testimonial = z.infer<typeof z.object(testimonials)>;
export type InsertTestimonial = Omit<Testimonial, "id" | "isApproved" | "createdAt">;

// Zod schemas for validation
export const insertProductSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  salePrice: z.number().positive().optional(),
  imageUrl: z.string().url(),
  categoryId: z.number().positive(),
  inStock: z.boolean(),
  isFeatured: z.boolean(),
  woodType: z.string().min(1),
  dimensions: z.string().min(1),
  weight: z.number().positive(),
  rating: z.number().min(0).max(5),
  reviewCount: z.number().min(0)
});

export const insertCartItemSchema = z.object({
  productId: z.number().positive(),
  quantity: z.number().positive()
});

export const insertOrderSchema = z.object({
  totalAmount: z.number().positive(),
  status: z.enum(["pending", "processing", "shipped", "delivered", "cancelled"]),
  shippingAddress: z.string().min(1),
  shippingCity: z.string().min(1),
  shippingState: z.string().min(1),
  shippingZipCode: z.string().min(1)
});

export const insertOrderItemSchema = z.object({
  orderId: z.number().positive(),
  productId: z.number().positive(),
  quantity: z.number().positive(),
  priceAtPurchase: z.number().positive()
});

export const insertTestimonialSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(1)
});
