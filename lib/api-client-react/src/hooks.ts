import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product, Category, CartItem, AddToCart } from "@workspace/api-zod";
import { fetchJson } from "./client.js";

export function useProducts(categorySlug?: string) {
  const url = categorySlug ? `/products?category=${categorySlug}` : "/products";
  return useQuery<Product[]>({
    queryKey: ["products", categorySlug],
    queryFn: () => fetchJson<Product[]>(url),
  });
}

export function useProduct(slug: string) {
  return useQuery<Product>({
    queryKey: ["product", slug],
    queryFn: () => fetchJson<Product>(`/products/${slug}`),
    enabled: Boolean(slug),
  });
}

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => fetchJson<Category[]>("/categories"),
  });
}

export function useCart(sessionId: string) {
  return useQuery<CartItem[]>({
    queryKey: ["cart", sessionId],
    queryFn: () => fetchJson<CartItem[]>(`/cart?sessionId=${sessionId}`),
    enabled: Boolean(sessionId),
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AddToCart & { sessionId: string }) =>
      fetchJson<CartItem>("/cart", { method: "POST", body: JSON.stringify(data) }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      fetchJson<void>(`/cart/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
