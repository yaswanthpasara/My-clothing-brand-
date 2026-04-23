import type { Page } from "../App.js";

interface FooterProps {
  navigate: (p: Page) => void;
}

export default function Footer({ navigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-3">MCB</h3>
            <p className="text-sm leading-relaxed">
              My Clothing Brand — premium basics designed to last.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Shop</h4>
            <ul className="space-y-2 text-sm">
              {["t-shirts", "hoodies", "pants", "accessories"].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => navigate({ name: "products", category: cat })}
                    className="hover:text-white transition-colors capitalize"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Info</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => navigate({ name: "about" })} className="hover:text-white transition-colors">About Us</button></li>
              <li><a href="mailto:hello@myclothingbrand.com" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} My Clothing Brand. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
