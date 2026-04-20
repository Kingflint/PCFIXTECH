// Free-form input validation helpers used by the booking flow and admin forms.

export interface ValidationResult {
  ok: boolean;
  errors: string[];
}

export function validateEmail(email: string): boolean {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validateName(name: string): boolean {
  if (!name) return false;
  const trimmed = name.trim();
  return trimmed.length >= 2 && trimmed.length <= 80;
}

export function validateAddress(address: string): boolean {
  if (!address) return false;
  return address.trim().length >= 10;
}

export function validateBooking(input: {
  name?: string;
  phone?: string;
  email?: string;
  device?: string;
  description?: string;
}): ValidationResult {
  const errors: string[] = [];
  if (!validateName(input.name ?? "")) errors.push("Please provide a valid name");
  if (!input.device) errors.push("Please choose a device");
  if (!input.description || input.description.trim().length < 10) {
    errors.push("Describe the issue in at least 10 characters");
  }
  if (input.email && !validateEmail(input.email)) errors.push("Invalid email address");
  return { ok: errors.length === 0, errors };
}

export function safeTrim(value: unknown, max = 500): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}
