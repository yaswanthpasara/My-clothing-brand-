import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import type { Page } from "../App.js";

interface HeaderProps {
  navigate: (p: Page) => void;
  cartCount: number;
}

export default function Header({ navigate, cartCount }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate({ name: "home" })}
            className="text-xl font-bold tracking-tight text-gray-900 hover:text-gray-600 transition-colors"
          >
            MCB
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigate({ name: "home" })}
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => navigate({ name: "products" })}
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
            >
              Shop
            </button>
            <button
              onClick={() => navigate({ name: "about" })}
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
            >
              About
            </button>
          </nav>

          {/* Cart */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate({ name: "cart" })}
              className="relative p-2 text-gray-700 hover:text-black transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-4">
          <button onClick={() => { navigate({ name: "home" }); setMenuOpen(false); }} className="text-left text-sm font-medium">Home</button>
          <button onClick={() => { navigate({ name: "products" }); setMenuOpen(false); }} className="text-left text-sm font-medium">Shop</button>
          <button onClick={() => { navigate({ name: "about" }); setMenuOpen(false); }} className="text-left text-sm font-medium">About</button>
        </div>
      )}
    </header>
  );
}
