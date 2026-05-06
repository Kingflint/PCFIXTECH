// Lookup helpers around the bundled Nigerian states / LGAs dataset.

import { NIGERIAN_STATES_LGAS } from "../data/nigerianStatesLGAs";

export function listStates(): string[] {
  return NIGERIAN_STATES_LGAS.map((entry) => entry.state).sort();
}

export function lgasFor(state: string): string[] {
  const lower = (state || "").toLowerCase();
  const match = NIGERIAN_STATES_LGAS.find((entry) => entry.state.toLowerCase() === lower);
  return match ? [...match.lgas].sort() : [];
}

export function isValidState(state: string): boolean {
  return listStates().some((s) => s.toLowerCase() === (state || "").toLowerCase());
}

export function isValidLga(state: string, lga: string): boolean {
  return lgasFor(state).some((l) => l.toLowerCase() === (lga || "").toLowerCase());
}