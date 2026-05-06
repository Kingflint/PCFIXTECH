// Helpers around the bundled device catalogue.

import { APPLE_DEVICE_MODELS, type DeviceModel } from "../data/devices";

function allDevices(): DeviceModel[] {
  const out: DeviceModel[] = [];
  for (const list of Object.values(APPLE_DEVICE_MODELS)) {
    out.push(...list);
  }
  return out;
}

export function deviceCategories(): string[] {
  const cats = new Set<string>();
  for (const d of allDevices()) {
    if (d?.category) cats.add(d.category);
  }
  return Array.from(cats).sort();
}

export function devicesInCategory(category: string): DeviceModel[] {
  return allDevices().filter((d) => d.category === category);
}

export function findDevice(name: string): DeviceModel | undefined {
  const lower = (name || "").toLowerCase();
  return allDevices().find((d) => String(d.name ?? "").toLowerCase() === lower);
}