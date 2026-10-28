"use client";

function formatWon(value) {
  return `${value.toLocaleString("ko-KR")}원`;
}

export default function DessertCard({ item, onAddToCart }) {
  const isLow = !item.soldOut && item.stock <= Math.ceil(item.maxStock * 0.2);

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-rose-100 via-amber-50 to-orange-100 text-6xl">
        <span
          className={item.soldOut ? "opacity-30 grayscale" : ""}
          aria-hidden
        >
          {item.emoji}
        </span>
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-rose-500 shadow-sm">
          {item.tag}
        </span>
        {item.soldOut && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/45 text-white">
            <span className="rotate-[-8deg] rounded-md border-2 border-white px-3 py-1 text-lg font-bold tracking-widest">
              품절
            </span>
            <span className="text-xs">
              재입고까지 {Math.max(0, Math.ceil(item.restockIn))}초
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-base font-bold text-zinc-900">{item.name}</h3>
        <p className="min-h-[2.5rem] text-sm text-zinc-500">
          {item.description}
        </p>

        <div className="mt-1 flex items-center gap-2">
          <span
            key={item.price}
            className={`text-xl font-extrabold ${
              item.flash === "up"
                ? "text-rose-500"
                : item.flash === "down"
                  ? "text-sky-500"
                  : "text-zinc-900"
            }`}
          >
            {formatWon(item.price)}
          </span>
          {item.flash === "up" && (
            <span className="text-sm font-semibold text-rose-500">▲</span>
          )}
          {item.flash === "down" && (
            <span className="text-sm font-semibold text-sky-500">▼</span>
          )}
        </div>

        <p
          className={`text-xs font-medium ${
            item.soldOut
              ? "text-zinc-400"
              : isLow
                ? "text-rose-500"
                : "text-zinc-400"
          }`}
        >
          {item.soldOut
            ? "재입고 대기 중"
            : isLow
              ? `서두르세요! 재고 ${item.stock}개 남음`
              : `재고 ${item.stock}개`}
        </p>

        <button
          type="button"
          disabled={item.soldOut}
          onClick={() => onAddToCart(item)}
          className="mt-2 w-full rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-500 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400"
        >
          {item.soldOut ? "품절" : "장바구니 담기"}
        </button>
      </div>
    </div>
  );
}
