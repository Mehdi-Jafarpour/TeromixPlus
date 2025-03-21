import { 
  users, User, InsertUser,
  categories, Category, InsertCategory,
  products, Product, InsertProduct, 
  cartItems, CartItem, InsertCartItem,
  orders, Order, InsertOrder,
  orderItems, OrderItem, InsertOrderItem,
  testimonials, Testimonial, InsertTestimonial
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;
  
  // Category operations
  getAllCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Product operations
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  searchProducts(query: string): Promise<Product[]>;
  
  // Cart operations
  getCartItems(userId: number): Promise<(CartItem & { product: Product })[]>;
  getCartItem(id: number): Promise<CartItem | undefined>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<boolean>;
  clearCart(userId: number): Promise<boolean>;
  
  // Order operations
  createOrder(order: InsertOrder): Promise<Order>;
  addOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;
  getOrdersByUser(userId: number): Promise<Order[]>;
  getOrderById(id: number): Promise<(Order & { items: (OrderItem & { product: Product })[] }) | undefined>;
  
  // Testimonial operations
  getAllTestimonials(): Promise<Testimonial[]>;
  getApprovedTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private products: Map<number, Product>;
  private cartItems: Map<number, CartItem>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  private testimonials: Map<number, Testimonial>;
  
  private currentUserId: number;
  private currentCategoryId: number;
  private currentProductId: number;
  private currentCartItemId: number;
  private currentOrderId: number;
  private currentOrderItemId: number;
  private currentTestimonialId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.testimonials = new Map();
    
    this.currentUserId = 1;
    this.currentCategoryId = 1;
    this.currentProductId = 1;
    this.currentCartItemId = 1;
    this.currentOrderId = 1;
    this.currentOrderItemId = 1;
    this.currentTestimonialId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Category operations
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug
    );
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  // Product operations
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.slug === slug
    );
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.categoryId === categoryId
    );
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.isFeatured
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { 
      ...insertProduct, 
      id, 
      createdAt: new Date() 
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: number, productData: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    
    const updatedProduct = { ...product, ...productData };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      (product) => 
        product.name.toLowerCase().includes(lowerQuery) || 
        product.description.toLowerCase().includes(lowerQuery) ||
        product.woodType.toLowerCase().includes(lowerQuery)
    );
  }

  // Cart operations
  async getCartItems(userId: number): Promise<(CartItem & { product: Product })[]> {
    const items = Array.from(this.cartItems.values()).filter(
      (item) => item.userId === userId
    );
    
    return items.map(item => {
      const product = this.products.get(item.productId)!;
      return { ...item, product };
    });
  }

  async getCartItem(id: number): Promise<CartItem | undefined> {
    return this.cartItems.get(id);
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    // Check if the product is already in the cart
    const existingItem = Array.from(this.cartItems.values()).find(
      (item) => item.userId === insertCartItem.userId && item.productId === insertCartItem.productId
    );
    
    if (existingItem) {
      // Update quantity instead of adding a new item
      existingItem.quantity += insertCartItem.quantity;
      this.cartItems.set(existingItem.id, existingItem);
      return existingItem;
    }
    
    const id = this.currentCartItemId++;
    const cartItem: CartItem = { 
      ...insertCartItem, 
      id, 
      addedAt: new Date() 
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const cartItem = this.cartItems.get(id);
    if (!cartItem) return undefined;
    
    if (quantity <= 0) {
      this.cartItems.delete(id);
      return undefined;
    }
    
    const updatedItem = { ...cartItem, quantity };
    this.cartItems.set(id, updatedItem);
    return updatedItem;
  }

  async removeFromCart(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(userId: number): Promise<boolean> {
    const userCartItems = Array.from(this.cartItems.values()).filter(
      (item) => item.userId === userId
    );
    
    for (const item of userCartItems) {
      this.cartItems.delete(item.id);
    }
    
    return true;
  }

  // Order operations
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const order: Order = { 
      ...insertOrder, 
      id, 
      createdAt: new Date() 
    };
    this.orders.set(id, order);
    return order;
  }

  async addOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const id = this.currentOrderItemId++;
    const orderItem: OrderItem = { ...insertOrderItem, id };
    this.orderItems.set(id, orderItem);
    return orderItem;
  }

  async getOrdersByUser(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => order.userId === userId
    );
  }

  async getOrderById(id: number): Promise<(Order & { items: (OrderItem & { product: Product })[] }) | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    
    const items = Array.from(this.orderItems.values())
      .filter(item => item.orderId === id)
      .map(item => {
        const product = this.products.get(item.productId)!;
        return { ...item, product };
      });
    
    return { ...order, items };
  }

  // Testimonial operations
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getApprovedTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).filter(
      (testimonial) => testimonial.isApproved
    );
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = { 
      ...insertTestimonial, 
      id, 
      isApproved: false,
      createdAt: new Date() 
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  // Initialize with sample data
  private initializeData() {
    // Add Categories
    const categoryData: InsertCategory[] = [
      {
        name: "Interior Doors",
        slug: "interior-doors",
        description: "Custom crafted for elegance and durability",
        imageUrl: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80"
      },
      {
        name: "Cabinetry",
        slug: "cabinetry",
        description: "Handcrafted storage solutions for any space",
        imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80"
      },
      {
        name: "Furniture",
        slug: "furniture",
        description: "Statement pieces built to stand the test of time",
        imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80"
      },
      {
        name: "Moldings",
        slug: "moldings",
        description: "Elegant finishing touches for your home",
        imageUrl: "https://images.unsplash.com/photo-1582986622978-a8883e0fb0c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80"
      },
      {
        name: "Decor",
        slug: "decor",
        description: "Wooden accents to elevate your space",
        imageUrl: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80"
      }
    ];

    categoryData.forEach(category => {
      const id = this.currentCategoryId++;
      this.categories.set(id, { ...category, id });
    });

    // Add Products
    const productData: InsertProduct[] = [
      {
        name: "Artisan Walnut Door",
        slug: "artisan-walnut-door",
        description: "This handcrafted solid walnut door features customizable panels and premium hardware, creating an elegant entryway solution for any interior space. Each door is meticulously crafted from sustainably sourced walnut wood, ensuring both beauty and environmental responsibility.",
        price: 1299.00,
        imageUrl: "https://images.unsplash.com/photo-1615529182904-14819c35db37?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80",
        categoryId: 1,
        inStock: true,
        isFeatured: true,
        woodType: "Walnut",
        dimensions: "80\" x 36\" x 1.75\"",
        weight: 45,
        rating: 4.5,
        reviewCount: 42
      },
      {
        name: "Farmhouse Kitchen Cabinet",
        slug: "farmhouse-kitchen-cabinet",
        description: "Our farmhouse kitchen cabinet combines rustic charm with modern functionality. Hand-finished oak with soft-close drawers and adjustable shelving provides both style and practicality for your kitchen storage needs.",
        price: 899.00,
        imageUrl: "https://images.unsplash.com/photo-1538688423619-a81d6f5c5ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80",
        categoryId: 2,
        inStock: true,
        isFeatured: true,
        woodType: "Oak",
        dimensions: "36\" x 24\" x 84\"",
        weight: 120,
        rating: 5.0,
        reviewCount: 28
      },
      {
        name: "Live Edge Coffee Table",
        slug: "live-edge-coffee-table",
        description: "Showcase nature's beauty with our stunning live edge coffee table. Handcrafted from a single slab of maple, each piece is truly unique with its own natural edge and grain pattern. The steel hairpin legs provide a modern contrast to the organic tabletop.",
        price: 649.00,
        salePrice: 799.00,
        imageUrl: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80",
        categoryId: 3,
        inStock: true,
        isFeatured: true,
        woodType: "Maple",
        dimensions: "48\" x 24\" x 18\"",
        weight: 65,
        rating: 4.0,
        reviewCount: 56
      },
      {
        name: "Floating Wall Shelves",
        slug: "floating-wall-shelves",
        description: "Add stylish storage to any room with our cherry wood floating shelves. Featuring hidden mounting hardware for a clean look, these shelves appear to float on your wall while securely holding books, décor, or kitchenware.",
        price: 249.00,
        imageUrl: "https://images.unsplash.com/photo-1503435980610-a51f3ddfee50?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80",
        categoryId: 5,
        inStock: true,
        isFeatured: true,
        woodType: "Cherry",
        dimensions: "36\" x 10\" x 2\"",
        weight: 12,
        rating: 4.5,
        reviewCount: 19
      },
      {
        name: "Craftsman Entry Door",
        slug: "craftsman-entry-door",
        description: "Make a striking first impression with our solid oak Craftsman-style entry door. Featuring traditional divided light glass panels and authentic joinery, this door combines historic design elements with modern performance standards.",
        price: 2199.00,
        imageUrl: "https://images.unsplash.com/photo-1509957660513-3d3db5e9525e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80",
        categoryId: 1,
        inStock: true,
        isFeatured: false,
        woodType: "Oak",
        dimensions: "80\" x 36\" x 2.25\"",
        weight: 85,
        rating: 4.7,
        reviewCount: 23
      },
      {
        name: "Wine Rack Cabinet",
        slug: "wine-rack-cabinet",
        description: "Store your wine collection in style with our custom wine rack cabinet. This beautifully crafted piece includes specialized storage for bottles, stemware, and accessories, all encased in rich mahogany with dovetail joinery.",
        price: 1450.00,
        imageUrl: "https://images.unsplash.com/photo-1529498165790-1207abd8b419?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80",
        categoryId: 2,
        inStock: true,
        isFeatured: false,
        woodType: "Mahogany",
        dimensions: "24\" x 18\" x 72\"",
        weight: 90,
        rating: 4.8,
        reviewCount: 17
      },
      {
        name: "Reclaimed Wood Dining Table",
        slug: "reclaimed-wood-dining-table",
        description: "Gather around our reclaimed wood dining table, where history and craftsmanship meet. Each table is handmade from century-old barn wood, preserving the character marks and patina that tell the story of its past life.",
        price: 1899.00,
        imageUrl: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80",
        categoryId: 3,
        inStock: true,
        isFeatured: false,
        woodType: "Reclaimed Pine",
        dimensions: "72\" x 40\" x 30\"",
        weight: 150,
        rating: 4.9,
        reviewCount: 31
      },
      {
        name: "Crown Molding Set",
        slug: "crown-molding-set",
        description: "Elevate your room's architecture with our premium crown molding set. Hand-milled from solid cherry, these profiles add timeless elegance to the transition between wall and ceiling. Each set includes straight pieces and corner blocks for a polished installation.",
        price: 399.00,
        imageUrl: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80",
        categoryId: 4,
        inStock: true,
        isFeatured: false,
        woodType: "Cherry",
        dimensions: "8' lengths, 4.5\" height",
        weight: 30,
        rating: 4.6,
        reviewCount: 14
      }
    ];

    productData.forEach(product => {
      const id = this.currentProductId++;
      this.products.set(id, { 
        ...product, 
        id, 
        createdAt: new Date() 
      });
    });

    // Add Testimonials
    const testimonialData: InsertTestimonial[] = [
      {
        name: "Sarah Johnson",
        location: "Homeowner in Portland, OR",
        rating: 5,
        comment: "The custom kitchen cabinets WoodCraft created for our home renovation are simply stunning. The attention to detail and quality of craftsmanship exceeded our expectations.",
        imageUrl: "https://randomuser.me/api/portraits/women/45.jpg"
      },
      {
        name: "Michael Rodriguez",
        location: "Interior Designer",
        rating: 5,
        comment: "As an interior designer, I've worked with many millwork companies, but WoodCraft consistently delivers exceptional quality. Their ability to translate my designs into beautiful wooden elements is unmatched.",
        imageUrl: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        name: "Emma Thompson",
        location: "Homeowner in Chicago, IL",
        rating: 4,
        comment: "The built-in bookshelves WoodCraft designed and installed have transformed our living room. The quality is outstanding, and they were a pleasure to work with throughout the entire process.",
        imageUrl: "https://randomuser.me/api/portraits/women/68.jpg"
      }
    ];

    testimonialData.forEach(testimonial => {
      const id = this.currentTestimonialId++;
      this.testimonials.set(id, { 
        ...testimonial, 
        id, 
        isApproved: true,
        createdAt: new Date() 
      });
    });
  }
}

export const storage = new MemStorage();
