import { useState } from "react";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import HomePage from "./pages/HomePage.js";
import ProductsPage from "./pages/ProductsPage.js";
import ProductDetailPage from "./pages/ProductDetailPage.js";
import CartPage from "./pages/CartPage.js";
import AboutPage from "./pages/AboutPage.js";

export type Page =
  | { name: "home" }
  | { name: "products"; category?: string }
  | { name: "product"; slug: string }
  | { name: "cart" }
  | { name: "about" };

export default function App() {
  const [page, setPage] = useState<Page>({ name: "home" });
  const [cartCount, setCartCount] = useState(0);

  function navigate(p: Page) {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header navigate={navigate} cartCount={cartCount} />
      <main className="flex-1">
        {page.name === "home" && <HomePage navigate={navigate} />}
        {page.name === "products" && (
          <ProductsPage navigate={navigate} category={page.category} />
        )}
        {page.name === "product" && (
          <ProductDetailPage
            slug={page.slug}
            navigate={navigate}
            onAddToCart={() => setCartCount((c) => c + 1)}
          />
        )}
        {page.name === "cart" && <CartPage navigate={navigate} />}
        {page.name === "about" && <AboutPage />}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}
