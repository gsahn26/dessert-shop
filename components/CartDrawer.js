"use client";

function formatWon(value) {
  return `${value.toLocaleString("ko-KR")}원`;
}

export default function CartDrawer({
  open,
  onClose,
  items,
  onRemove,
  onCheckout,
  total,
}) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
          <h2 className="text-lg font-bold text-zinc-900">🛒 장바구니</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-zinc-400 hover:text-zinc-700"
          >
            닫기 ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="mt-10 text-center text-sm text-zinc-400">
              아직 담은 디저트가 없어요.
            </p>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((cartItem) => (
                <li
                  key={cartItem.id}
                  className="flex items-center gap-3 rounded-2xl border border-zinc-100 p-3"
                >
                  <span className="text-3xl">{cartItem.emoji}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-zinc-900">
                      {cartItem.name}
                    </p>
                    <p className="text-xs text-zinc-400">
                      {formatWon(cartItem.price)} × {cartItem.qty}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-bold text-zinc-900">
                      {formatWon(cartItem.price * cartItem.qty)}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemove(cartItem.id)}
                      className="text-xs text-rose-400 hover:text-rose-600"
                    >
                      빼기
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-zinc-100 px-5 py-4">
          <div className="mb-3 flex items-center justify-between text-sm font-medium text-zinc-500">
            <span>총 결제 금액</span>
            <span className="text-lg font-extrabold text-zinc-900">
              {formatWon(total)}
            </span>
          </div>
          <button
            type="button"
            disabled={items.length === 0}
            onClick={onCheckout}
            className="w-full rounded-full bg-rose-500 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-rose-600 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400"
          >
            주문하기
          </button>
        </div>
      </aside>
    </>
  );
}
