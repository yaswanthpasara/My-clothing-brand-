import express from "express";
import { products, categories } from "./data.js";
import type { CartItem } from "@workspace/api-zod";
import { AddToCartSchema } from "@workspace/api-zod";

const app = express();
app.use(express.json());

// In-memory cart
const cart: CartItem[] = [];
let cartIdCounter = 1;

// GET /api/categories
app.get("/api/categories", (_req, res) => {
  res.json(categories);
});

// GET /api/products?category=slug
app.get("/api/products", (req, res) => {
  const categorySlug = req.query["category"] as string | undefined;
  if (categorySlug) {
    const cat = categories.find((c) => c.slug === categorySlug);
    if (!cat) {
      res.status(404).json({ error: "Category not found" });
      return;
    }
    res.json(products.filter((p) => p.categoryId === cat.id));
    return;
  }
  res.json(products);
});

// GET /api/products/:slug
app.get("/api/products/:slug", (req, res) => {
  const product = products.find((p) => p.slug === req.params["slug"]);
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.json(product);
});

// GET /api/cart?sessionId=xxx
app.get("/api/cart", (req, res) => {
  const sessionId = req.query["sessionId"] as string | undefined;
  if (!sessionId) {
    res.status(400).json({ error: "sessionId required" });
    return;
  }
  res.json(cart.filter((item) => item.sessionId === sessionId));
});

// POST /api/cart
app.post("/api/cart", (req, res) => {
  const result = AddToCartSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.flatten() });
    return;
  }
  const sessionId = (req.body as { sessionId?: string }).sessionId;
  if (!sessionId) {
    res.status(400).json({ error: "sessionId required" });
    return;
  }
  const item: CartItem = {
    id: cartIdCounter++,
    sessionId,
    productId: result.data.productId,
    quantity: result.data.quantity,
    size: result.data.size ?? null,
    color: result.data.color ?? null,
    createdAt: new Date().toISOString(),
  };
  cart.push(item);
  res.status(201).json(item);
});

// DELETE /api/cart/:id
app.delete("/api/cart/:id", (req, res) => {
  const id = Number(req.params["id"]);
  const idx = cart.findIndex((item) => item.id === id);
  if (idx === -1) {
    res.status(404).json({ error: "Cart item not found" });
    return;
  }
  cart.splice(idx, 1);
  res.status(204).send();
});

const PORT = process.env["PORT"] ?? 8080;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
