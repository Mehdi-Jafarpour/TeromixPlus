import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertProductSchema, 
  insertCartItemSchema, 
  insertOrderSchema, 
  insertOrderItemSchema,
  insertTestimonialSchema
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import nodemailer from "nodemailer";

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'm.jafarpour.teromix.ge',
    pass: process.env.EMAIL_PASSWORD // You'll need to set this in your environment variables
  }
});

// Function to send pre-order notifications
async function sendPreOrderNotifications(customerInfo: any, items: any[], total: number) {
  const orderDetails = items.map(item => `
    Product: ${item.productName}
    Dimension: ${item.dimension}
    Quantity: ${item.quantity}
    Price: $${item.price.toFixed(2)}
  `).join('\n\n');

  // Email to customer
  await transporter.sendMail({
    from: process.env.EMAIL_USER || 'm.jafarpour.teromix.ge',
    to: customerInfo.email,
    subject: 'Your Pre-Order Confirmation - Teromix',
    html: `
      <h2>Thank you for your pre-order!</h2>
      <p>Dear ${customerInfo.fullName},</p>
      <p>We have received your pre-order and will contact you shortly to finalize your purchase.</p>
      
      <h3>Order Details:</h3>
      <pre>${orderDetails}</pre>
      
      <p><strong>Total Amount:</strong> $${total.toFixed(2)}</p>
      
      <p>If you have any questions, please don't hesitate to contact us.</p>
      
      <p>Best regards,<br>The Teromix Team</p>
    `
  });

  // Email to admin
  await transporter.sendMail({
    from: process.env.EMAIL_USER || 'm.jafarpour.teromix.ge',
    to: process.env.ADMIN_EMAIL || 'm.jafarpour.teromix.ge',
    subject: 'New Pre-Order Received',
    html: `
      <h2>New Pre-Order Received</h2>
      
      <h3>Customer Information:</h3>
      <p>Name: ${customerInfo.fullName}</p>
      <p>Email: ${customerInfo.email}</p>
      <p>Phone: ${customerInfo.phone}</p>
      ${customerInfo.message ? `<p>Additional Notes: ${customerInfo.message}</p>` : ''}
      
      <h3>Order Details:</h3>
      <pre>${orderDetails}</pre>
      
      <p><strong>Total Amount:</strong> $${total.toFixed(2)}</p>
    `
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Categories
  app.get("/api/categories", async (req: Request, res: Response) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:slug", async (req: Request, res: Response) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      const products = await storage.getProductsByCategory(category.id);
      res.json({
        category,
        products
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  // Products
  app.get("/api/products", async (req: Request, res: Response) => {
    try {
      const query = req.query.q as string | undefined;
      const categoryId = req.query.category ? parseInt(req.query.category as string) : undefined;
      
      let products;
      
      if (query) {
        products = await storage.searchProducts(query);
      } else if (categoryId) {
        products = await storage.getProductsByCategory(categoryId);
      } else {
        products = await storage.getAllProducts();
      }
      
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/featured", async (req: Request, res: Response) => {
    try {
      const products = await storage.getFeaturedProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured products" });
    }
  });

  app.get("/api/products/:slug", async (req: Request, res: Response) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Cart Operations
  app.get("/api/cart", async (req: Request, res: Response) => {
    try {
      const cartItems = await storage.getCartItems();
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });

  app.post("/api/cart", async (req: Request, res: Response) => {
    try {
      const parsedBody = insertCartItemSchema.parse(req.body);
      const cartItem = await storage.addToCart(parsedBody);
      res.status(201).json(cartItem);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      res.status(500).json({ message: "Failed to add item to cart" });
    }
  });

  app.patch("/api/cart/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { quantity } = req.body;
      
      if (typeof quantity !== 'number' || quantity < 0) {
        return res.status(400).json({ message: "Invalid quantity value" });
      }
      
      const updatedItem = await storage.updateCartItem(id, quantity);
      
      if (!updatedItem && quantity > 0) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      res.json({ success: true, item: updatedItem });
    } catch (error) {
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.removeFromCart(id);
      
      if (!success) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove item from cart" });
    }
  });

  app.delete("/api/cart", async (req: Request, res: Response) => {
    try {
      await storage.clearCart();
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  // Orders
  app.post("/api/orders", async (req: Request, res: Response) => {
    try {
      // Get the cart items
      const cartItems = await storage.getCartItems();
      
      if (cartItems.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }
      
      // Calculate the total amount
      const totalAmount = cartItems.reduce(
        (total, item) => total + (item.product.salePrice || item.product.price) * item.quantity, 
        0
      );
      
      // Create an order schema to validate the input
      const orderSchema = z.object({
        shippingAddress: z.string().min(1),
        shippingCity: z.string().min(1),
        shippingState: z.string().min(1),
        shippingZipCode: z.string().min(1)
      });
      
      const { shippingAddress, shippingCity, shippingState, shippingZipCode } = orderSchema.parse(req.body);
      
      // Create the order
      const order = await storage.createOrder({
        totalAmount,
        status: "pending",
        shippingAddress,
        shippingCity,
        shippingState,
        shippingZipCode
      });
      
      // Create order items
      for (const item of cartItems) {
        await storage.addOrderItem({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          priceAtPurchase: item.product.salePrice || item.product.price
        });
      }
      
      // Clear the cart
      await storage.clearCart();
      
      // Fetch the complete order with items
      const completeOrder = await storage.getOrderById(order.id);
      
      res.status(201).json(completeOrder);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  app.get("/api/orders", async (req: Request, res: Response) => {
    try {
      const orders = await storage.getOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.get("/api/orders/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const order = await storage.getOrderById(id);
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  // Testimonials
  app.get("/api/testimonials", async (req: Request, res: Response) => {
    try {
      const testimonials = await storage.getApprovedTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/testimonials", async (req: Request, res: Response) => {
    try {
      const parsedBody = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(parsedBody);
      res.status(201).json(testimonial);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      res.status(500).json({ message: "Failed to create testimonial" });
    }
  });

  // Pre-Orders
  app.post("/api/pre-orders", async (req: Request, res: Response) => {
    try {
      const { customerInfo, items, total } = req.body;
      
      // Send email notifications
      await sendPreOrderNotifications(customerInfo, items, total);
      
      // Here you would typically save the pre-order to your database
      console.log('New Pre-Order:', {
        customerInfo,
        items,
        total,
        timestamp: new Date().toISOString()
      });
      
      res.status(201).json({
        message: "Pre-order submitted successfully",
        orderId: Date.now() // Temporary order ID
      });
    } catch (error) {
      console.error('Pre-order submission error:', error);
      res.status(500).json({ message: "Failed to submit pre-order" });
    }
  });

  // Newsletter subscription endpoint
  app.post('/api/newsletter/subscribe', async (req, res) => {
    try {
      const { email, marketingEmail } = req.body;

      if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Invalid email address' });
      }

      // Send email to marketing
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: marketingEmail,
        subject: 'New Newsletter Subscription',
        text: `A new user has subscribed to the newsletter:\nEmail: ${email}`,
        html: `
          <h2>New Newsletter Subscription</h2>
          <p>A new user has subscribed to the newsletter:</p>
          <p><strong>Email:</strong> ${email}</p>
        `
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: 'Subscription successful' });
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      res.status(500).json({ error: 'Failed to process subscription' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
