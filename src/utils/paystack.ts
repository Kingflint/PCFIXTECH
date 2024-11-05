import { PAYSTACK_PUBLIC_KEY } from "../config/paystack";

export interface PaystackHandle {
  openIframe: () => void;
}

export interface PaystackOptions {
  email: string;
  amountKobo: number;
  reference: string;
  metadata?: Record<string, unknown>;
  onSuccess: (reference: string) => void;
  onClose: () => void;
}

export function inlineCheckout(opts: PaystackOptions): PaystackHandle | null {
  if (typeof window === "undefined") return null;
  const Paystack = (window as any).PaystackPop;
  if (!Paystack || !PAYSTACK_PUBLIC_KEY) return null;
  const handle = Paystack.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email: opts.email,
    amount: opts.amountKobo,
    ref: opts.reference,
    metadata: opts.metadata ?? {},
    callback: (resp: { reference: string }) => opts.onSuccess(resp.reference),
    onClose: () => opts.onClose(),
  }) as PaystackHandle;
  return handle;
}

export function nairaToKobo(amount: number): number {
  if (!Number.isFinite(amount) || amount <= 0) return 0;
  return Math.round(amount * 100);
}