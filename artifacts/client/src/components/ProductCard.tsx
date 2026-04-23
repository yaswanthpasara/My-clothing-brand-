import { motion } from "framer-motion";
import type { Product } from "@workspace/api-zod";
import type { Page } from "../App.js";

interface ProductCardProps {
  product: Product;
  navigate: (p: Page) => void;
}

export default function ProductCard({ product, navigate }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group cursor-pointer"
      onClick={() => navigate({ name: "product", slug: product.slug })}
    >
      <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-[3/4]">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.featured && (
          <span className="absolute top-3 left-3 bg-black text-white text-xs font-medium px-2 py-1 rounded">
            Featured
          </span>
        )}
        {!product.inStock && (
          <span className="absolute inset-0 bg-white/60 flex items-center justify-center text-sm font-medium text-gray-700">
            Sold Out
          </span>
        )}
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 text-sm font-semibold text-gray-900">${product.price}</p>
        {product.colors.length > 0 && (
          <p className="mt-1 text-xs text-gray-500">{product.colors.join(" · ")}</p>
        )}
      </div>
    </motion.div>
  );
}
