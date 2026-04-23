import { useState } from "react";
import { useProducts } from "@workspace/api-client-react";
import ProductCard from "../components/ProductCard.js";
import type { Page } from "../App.js";

interface ProductsPageProps {
  navigate: (p: Page) => void;
  category?: string;
}

const CATEGORIES = [
  { label: "All", slug: undefined },
  { label: "T-Shirts", slug: "t-shirts" },
  { label: "Hoodies", slug: "hoodies" },
  { label: "Pants", slug: "pants" },
  { label: "Accessories", slug: "accessories" },
];

export default function ProductsPage({ navigate, category: initialCategory }: ProductsPageProps) {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(initialCategory);
  const { data: products = [], isLoading } = useProducts(activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shop</h1>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setActiveCategory(cat.slug)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat.slug
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg aspect-[3/4]" />
              <div className="mt-3 h-4 bg-gray-200 rounded w-3/4" />
              <div className="mt-2 h-4 bg-gray-200 rounded w-1/4" />
            </div>
          ))}
        </div>
      )}

      {!isLoading && products.length === 0 && (
        <div className="text-center py-20 text-gray-500">No products found.</div>
      )}

      {!isLoading && products.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} navigate={navigate} />
          ))}
        </div>
      )}
    </div>
  );
}
