import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useProducts } from "@workspace/api-client-react";
import ProductCard from "../components/ProductCard.js";
import type { Page } from "../App.js";

interface HomePageProps {
  navigate: (p: Page) => void;
}

const categories = [
  { label: "T-Shirts", slug: "t-shirts", emoji: "👕" },
  { label: "Hoodies", slug: "hoodies", emoji: "🧥" },
  { label: "Pants", slug: "pants", emoji: "👖" },
  { label: "Accessories", slug: "accessories", emoji: "🧢" },
];

export default function HomePage({ navigate }: HomePageProps) {
  const { data: products = [] } = useProducts();
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gray-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-7xl font-bold tracking-tight leading-tight"
          >
            Wear Your Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-lg sm:text-xl text-gray-300 max-w-xl"
          >
            Premium basics crafted for everyday life. Clean design, sustainable materials.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={() => navigate({ name: "products" })}
            className="mt-10 inline-flex items-center gap-2 bg-white text-black font-semibold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors"
          >
            Shop Now <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <motion.button
              key={cat.slug}
              whileHover={{ scale: 1.03 }}
              onClick={() => navigate({ name: "products", category: cat.slug })}
              className="flex flex-col items-center justify-center gap-3 bg-gray-50 hover:bg-gray-100 rounded-2xl py-8 transition-colors"
            >
              <span className="text-4xl">{cat.emoji}</span>
              <span className="text-sm font-semibold text-gray-800">{cat.label}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured</h2>
            <button
              onClick={() => navigate({ name: "products" })}
              className="text-sm font-medium text-gray-500 hover:text-black transition-colors flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} navigate={navigate} />
            ))}
          </div>
        </section>
      )}

      {/* Banner */}
      <section className="bg-gray-950 text-white py-20 mt-8">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Sustainable. Minimal. Yours.</h2>
          <p className="text-gray-300 text-lg mb-8">
            Every piece is made with intention — from ethically sourced materials to carbon-neutral shipping.
          </p>
          <button
            onClick={() => navigate({ name: "about" })}
            className="border border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-colors font-medium"
          >
            Our Story
          </button>
        </div>
      </section>
    </div>
  );
}
