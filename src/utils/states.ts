// Lookup helpers around the bundled Nigerian states / LGAs dataset.

import { NIGERIAN_STATES_LGAS } from "../data/nigerianStatesLGAs";

export function listStates(): string[] {
  return Object.keys(NIGERIAN_STATES_LGAS).sort();
}

export function lgasFor(state: string): string[] {
  const exact = (NIGERIAN_STATES_LGAS as Record<string, string[]>)[state];
  if (exact) return [...exact].sort();
  const lower = state.toLowerCase();
  const match = Object.keys(NIGERIAN_STATES_LGAS).find((k) => k.toLowerCase() === lower);
  return match ? [...(NIGERIAN_STATES_LGAS as any)[match]].sort() : [];
}

export function isValidState(state: string): boolean {
  return listStates().some((s) => s.toLowerCase() === (state || "").toLowerCase());
}

export function isValidLga(state: string, lga: string): boolean {
  return lgasFor(state).some((l) => l.toLowerCase() === (lga || "").toLowerCase());
}