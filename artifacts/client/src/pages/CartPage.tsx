import { ShoppingBag, ArrowLeft } from "lucide-react";
import type { Page } from "../App.js";

interface CartPageProps {
  navigate: (p: Page) => void;
}

export default function CartPage({ navigate }: CartPageProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate({ name: "products" })}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Continue Shopping
      </button>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <ShoppingBag className="w-16 h-16 mb-4" />
        <p className="text-lg font-medium">Your cart is empty</p>
        <p className="mt-1 text-sm">Add some items to get started.</p>
        <button
          onClick={() => navigate({ name: "products" })}
          className="mt-6 bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
}
