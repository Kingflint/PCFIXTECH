// Phone number normalisation helpers for Nigerian phone numbers.

const NG_PREFIXES = ["070", "080", "081", "090", "091", "071"];

export function normalizeNigerianPhone(input: string): string {
  if (!input) return "";
  const digits = input.replace(/\D+/g, "");
  if (!digits) return "";
  if (digits.startsWith("234") && digits.length >= 13) {
    return `+${digits.slice(0, 13)}`;
  }
  if (digits.startsWith("0") && digits.length === 11) {
    return `+234${digits.slice(1)}`;
  }
  if (digits.length === 10) {
    return `+234${digits}`;
  }
  return digits.startsWith("+") ? input : `+${digits}`;
}

export function isValidNigerianPhone(input: string): boolean {
  const normalised = normalizeNigerianPhone(input);
  if (!normalised.startsWith("+234") || normalised.length !== 14) return false;
  const local = `0${normalised.slice(4, 6)}`;
  return NG_PREFIXES.includes(local);
}

export function formatPhoneForDisplay(input: string): string {
  const normalised = normalizeNigerianPhone(input);
  if (!normalised.startsWith("+234") || normalised.length !== 14) return input;
  const country = normalised.slice(0, 4);
  const block1 = normalised.slice(4, 7);
  const block2 = normalised.slice(7, 10);
  const block3 = normalised.slice(10);
  return `${country} ${block1} ${block2} ${block3}`;
}

export function whatsappLinkFor(phone: string, message?: string): string {
  const normalised = normalizeNigerianPhone(phone).replace(/\+/g, "");
  if (!normalised) return "";
  const suffix = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${normalised}${suffix}`;
}
