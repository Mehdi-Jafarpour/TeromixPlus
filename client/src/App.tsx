import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import { CartProvider } from "@/contexts/CartContext";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import PreOrder from "@/pages/PreOrder";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import CustomOrders from "@/pages/CustomOrders";
import Services from "@/pages/Services";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TestPage from '@/pages/Test';

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={Products} />
      <Route path="/products/:slug" component={ProductDetail} />
      <Route path="/cart" component={Cart} />
      <Route path="/pre-order" component={PreOrder} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/custom-orders" component={CustomOrders} />
      <Route path="/services" component={Services} />
      <Route path="/test" component={TestPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
