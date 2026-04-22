"use client";

import { useCart } from "@/components/storefront/CartContext";
import { formatGHS } from "@/lib/utils";

interface CartDrawerProps {
  whatsapp: string;
  storeName: string;
}

export function CartDrawer({ whatsapp, storeName }: CartDrawerProps) {
  const { items, remove, increment, decrement, total, count, isOpen, closeCart } = useCart();

  function buildWaMessage() {
    const lines = items.map((i) => `• ${i.product.name} x${i.quantity} — ${formatGHS(i.product.priceGhs * i.quantity)}`);
    return encodeURIComponent(
      `Hi ${storeName}! I'd like to place an order:\n\n${lines.join("\n")}\n\nTotal: ${formatGHS(total)}`
    );
  }

  const waHref = `https://wa.me/${whatsapp.replace(/[^\d]/g, "")}?text=${buildWaMessage()}`;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-sm bg-card shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div>
            <h2 className="text-base font-semibold text-foreground">Your cart</h2>
            <p className="text-xs text-muted-foreground">{count} item{count !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={closeCart}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-muted-foreground">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 6h18M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-sm font-medium text-foreground">Your cart is empty</p>
              <p className="text-xs text-muted-foreground">Add products to get started</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-4">
                <div className="h-16 w-16 shrink-0 rounded-xl bg-muted/60 flex items-center justify-center text-lg font-bold text-muted-foreground/30 border border-border">
                  {item.product.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">{formatGHS(item.product.priceGhs)} each</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => decrement(item.product.id)}
                      className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-sm hover:bg-muted transition-colors"
                    >−</button>
                    <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => increment(item.product.id)}
                      className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-sm hover:bg-muted transition-colors"
                    >+</button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => remove(item.product.id)}
                    className="text-muted-foreground hover:text-red-500 transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <p className="text-sm font-semibold text-foreground">{formatGHS(item.product.priceGhs * item.quantity)}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-base font-semibold text-foreground">{formatGHS(total)}</span>
            </div>
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white hover:bg-[#1ebe5d] transition-colors shadow-md"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Checkout on WhatsApp
            </a>
            <p className="text-center text-xs text-muted-foreground">You'll be redirected to WhatsApp to confirm your order</p>
          </div>
        )}
      </aside>
    </>
  );
}
