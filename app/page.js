"use client";

import { useState } from "react";
import DessertCard from "@/components/DessertCard";
import CartDrawer from "@/components/CartDrawer";
import { useLiveDesserts } from "@/lib/useLiveDesserts";

function formatWon(value) {
  return `${value.toLocaleString("ko-KR")}원`;
}

export default function Home() {
  const dessertsLive = useLiveDesserts();
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState("");

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(""), 2200);
  }

  function handleAddToCart(item) {
    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, qty: cartItem.qty + 1, price: item.price }
            : cartItem
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          emoji: item.emoji,
          price: item.price,
          qty: 1,
        },
      ];
    });
    showToast(`${item.emoji} ${item.name} 담았어요!`);
    setCartOpen(true);
  }

  function handleRemove(id) {
    setCart((prev) => prev.filter((cartItem) => cartItem.id !== id));
  }

  function handleCheckout() {
    showToast("주문이 접수되었습니다! 맛있게 즐겨주세요 🎉");
    setCart([]);
    setCartOpen(false);
  }

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-amber-50">
      <header className="sticky top-0 z-30 border-b border-rose-100/80 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <span className="text-lg font-extrabold text-zinc-900">
            🍮 오픈런 디저트
          </span>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-rose-500"
          >
            🛒 장바구니
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[11px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 py-14 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-rose-500">
          Live Price · Limited Stock
        </p>
        <h1 className="text-3xl font-extrabold text-zinc-900 sm:text-4xl">
          줄 서지 않고도 만나는, 요즘 제일 핫한 디저트
        </h1>
        <p className="mt-3 text-zinc-500">
          인기에 따라 가격이 실시간으로 움직이고, 재고가 떨어지면 품절돼요.
          타이밍을 놓치지 마세요!
        </p>
      </section>

      <main className="mx-auto max-w-5xl px-4 pb-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dessertsLive.map((item) => (
            <DessertCard key={item.id} item={item} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </main>

      <footer className="border-t border-rose-100 bg-white/60 py-8 text-center text-xs text-zinc-400">
        🍮 오픈런 디저트 · 가격과 재고는 데모를 위해 임의로 변동합니다
      </footer>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onRemove={handleRemove}
        onCheckout={handleCheckout}
        total={cartTotal}
      />

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
