// Apple and Non-Apple device categories, models, and common issues

export type DeviceCategory = "MacBook" | "iPhone" | "iPad" | "Apple Watch" | "AirPods" | "Non-Apple";

export interface DeviceModel {
  id: string;
  name: string;
  category: DeviceCategory;
  brand?: string; // For non-Apple devices
}

export interface DeviceIssue {
  id: string;
  name: string;
  description: string;
  categories: DeviceCategory[]; // Which categories this issue applies to
}

export const APPLE_DEVICE_MODELS: Record<Exclude<DeviceCategory, "Non-Apple">, DeviceModel[]> = {
  MacBook: [
    { id: "macbook-m4-pro", name: "MacBook Pro M4 Pro", category: "MacBook" },
    { id: "macbook-m4-max", name: "MacBook Pro M4 Max", category: "MacBook" },
    { id: "macbook-m4", name: "MacBook Pro M4", category: "MacBook" },
    { id: "macbook-m3-pro", name: "MacBook Pro M3 Pro", category: "MacBook" },
    { id: "macbook-m3-max", name: "MacBook Pro M3 Max", category: "MacBook" },
    { id: "macbook-m3", name: "MacBook Pro M3", category: "MacBook" },
    { id: "macbook-m2-pro", name: "MacBook Pro M2 Pro", category: "MacBook" },
    { id: "macbook-m2-max", name: "MacBook Pro M2 Max", category: "MacBook" },
    { id: "macbook-m2", name: "MacBook Pro M2", category: "MacBook" },
    { id: "macbook-m1-pro", name: "MacBook Pro M1 Pro", category: "MacBook" },
    { id: "macbook-m1-max", name: "MacBook Pro M1 Max", category: "MacBook" },
    { id: "macbook-m1", name: "MacBook Pro M1", category: "MacBook" },
    { id: "macbook-air-m3", name: "MacBook Air M3", category: "MacBook" },
    { id: "macbook-air-m2", name: "MacBook Air M2", category: "MacBook" },
    { id: "macbook-air-m1", name: "MacBook Air M1", category: "MacBook" },
    { id: "macbook-intel", name: "MacBook (Intel - Older Model)", category: "MacBook" },
  ],
  iPhone: [
    { id: "iphone-16-pro-max", name: "iPhone 16 Pro Max", category: "iPhone" },
    { id: "iphone-16-pro", name: "iPhone 16 Pro", category: "iPhone" },
    { id: "iphone-16-plus", name: "iPhone 16 Plus", category: "iPhone" },
    { id: "iphone-16", name: "iPhone 16", category: "iPhone" },
    { id: "iphone-15-pro-max", name: "iPhone 15 Pro Max", category: "iPhone" },
    { id: "iphone-15-pro", name: "iPhone 15 Pro", category: "iPhone" },
    { id: "iphone-15-plus", name: "iPhone 15 Plus", category: "iPhone" },
    { id: "iphone-15", name: "iPhone 15", category: "iPhone" },
    { id: "iphone-14-pro-max", name: "iPhone 14 Pro Max", category: "iPhone" },
    { id: "iphone-14-pro", name: "iPhone 14 Pro", category: "iPhone" },
    { id: "iphone-14-plus", name: "iPhone 14 Plus", category: "iPhone" },
    { id: "iphone-14", name: "iPhone 14", category: "iPhone" },
    { id: "iphone-13-pro-max", name: "iPhone 13 Pro Max", category: "iPhone" },
    { id: "iphone-13-pro", name: "iPhone 13 Pro", category: "iPhone" },
    { id: "iphone-13", name: "iPhone 13", category: "iPhone" },
    { id: "iphone-12-pro-max", name: "iPhone 12 Pro Max", category: "iPhone" },
    { id: "iphone-12-pro", name: "iPhone 12 Pro", category: "iPhone" },
    { id: "iphone-12", name: "iPhone 12", category: "iPhone" },
    { id: "iphone-se-3rd", name: "iPhone SE (3rd Gen)", category: "iPhone" },
    { id: "iphone-11-pro-max", name: "iPhone 11 Pro Max", category: "iPhone" },
    { id: "iphone-11", name: "iPhone 11", category: "iPhone" },
    { id: "iphone-older", name: "iPhone (Older Model)", category: "iPhone" },
  ],
  iPad: [
    { id: "ipad-pro-m4-13", name: "iPad Pro M4 (13-inch)", category: "iPad" },
    { id: "ipad-pro-m4-11", name: "iPad Pro M4 (11-inch)", category: "iPad" },
    { id: "ipad-pro-m2", name: "iPad Pro M2", category: "iPad" },
    { id: "ipad-air-m3", name: "iPad Air M3", category: "iPad" },
    { id: "ipad-air-m2", name: "iPad Air M2", category: "iPad" },
    { id: "ipad-10th", name: "iPad (10th Gen)", category: "iPad" },
    { id: "ipad-9th", name: "iPad (9th Gen)", category: "iPad" },
    { id: "ipad-mini-7", name: "iPad Mini (7th Gen)", category: "iPad" },
    { id: "ipad-mini-6", name: "iPad Mini (6th Gen)", category: "iPad" },
    { id: "ipad-older", name: "iPad (Older Model)", category: "iPad" },
  ],
  "Apple Watch": [
    { id: "watch-ultra-2", name: "Apple Watch Ultra 2", category: "Apple Watch" },
    { id: "watch-series-10", name: "Apple Watch Series 10", category: "Apple Watch" },
    { id: "watch-series-9", name: "Apple Watch Series 9", category: "Apple Watch" },
    { id: "watch-se-2nd", name: "Apple Watch SE (2nd Gen)", category: "Apple Watch" },
    { id: "watch-series-8", name: "Apple Watch Series 8", category: "Apple Watch" },
    { id: "watch-series-7", name: "Apple Watch Series 7", category: "Apple Watch" },
    { id: "watch-older", name: "Apple Watch (Older Model)", category: "Apple Watch" },
  ],
  AirPods: [
    { id: "airpods-max-2nd", name: "AirPods Max (2nd Gen)", category: "AirPods" },
    { id: "airpods-max", name: "AirPods Max (1st Gen)", category: "AirPods" },
    { id: "airpods-pro-2", name: "AirPods Pro (2nd Gen)", category: "AirPods" },
    { id: "airpods-pro", name: "AirPods Pro (1st Gen)", category: "AirPods" },
    { id: "airpods-4", name: "AirPods (4th Gen)", category: "AirPods" },
    { id: "airpods-3", name: "AirPods (3rd Gen)", category: "AirPods" },
    { id: "airpods-2", name: "AirPods (2nd Gen)", category: "AirPods" },
  ],
};

export const NON_APPLE_BRANDS = [
  "HP",
  "Dell",
  "Lenovo",
  "Samsung",
  "Asus",
  "Acer",
  "Microsoft Surface",
  "Huawei",
  "Xiaomi",
  "Google Pixel",
  "OnePlus",
  "Oppo",
  "Tecno",
  "Infinix",
  "Other",
];

export const DEVICE_ISSUES: DeviceIssue[] = [
  // Screen issues
  { id: "black-screen", name: "Black Screen / No Display", description: "Device screen is black or not turning on", categories: ["MacBook", "iPhone", "iPad", "Apple Watch"] },
  { id: "cracked-screen", name: "Cracked / Broken Screen", description: "Screen glass or display is cracked or shattered", categories: ["MacBook", "iPhone", "iPad", "Apple Watch"] },
  { id: "screen-flickering", name: "Screen Flickering / Glitching", description: "Display is flickering, showing lines, or glitching", categories: ["MacBook", "iPhone", "iPad", "Apple Watch"] },
  { id: "touch-not-working", name: "Touch Screen Not Responding", description: "Touch input is not working or partially working", categories: ["iPhone", "iPad", "Apple Watch"] },
  { id: "screen-replacement", name: "Screen Replacement", description: "Full screen replacement needed", categories: ["MacBook", "iPhone", "iPad", "Apple Watch"] },

  // Battery issues
  { id: "battery-replacement", name: "Battery Replacement", description: "Battery drains fast or needs replacement", categories: ["MacBook", "iPhone", "iPad", "Apple Watch", "AirPods"] },
  { id: "battery-swollen", name: "Swollen Battery", description: "Battery is expanding/swollen inside the device", categories: ["MacBook", "iPhone", "iPad"] },
  { id: "not-charging", name: "Not Charging", description: "Device is not charging when plugged in", categories: ["MacBook", "iPhone", "iPad", "Apple Watch", "AirPods"] },
  { id: "slow-charging", name: "Slow Charging", description: "Device charges very slowly", categories: ["MacBook", "iPhone", "iPad"] },

  // Port / Connector issues
  { id: "charging-port", name: "Charging Port Repair", description: "Charging port is damaged or loose", categories: ["MacBook", "iPhone", "iPad"] },
  { id: "headphone-jack", name: "Headphone Jack Issue", description: "Headphone jack not working or broken", categories: ["MacBook"] },
  { id: "usb-port", name: "USB / Thunderbolt Port Issue", description: "USB or Thunderbolt ports not working", categories: ["MacBook"] },

  // Performance issues
  { id: "overheating", name: "Overheating", description: "Device gets excessively hot during use", categories: ["MacBook", "iPhone", "iPad"] },
  { id: "slow-performance", name: "Slow Performance / Lagging", description: "Device is running slow or freezing", categories: ["MacBook", "iPhone", "iPad"] },
  { id: "random-restart", name: "Random Restarts / Crashes", description: "Device restarts or crashes unexpectedly", categories: ["MacBook", "iPhone", "iPad", "Apple Watch"] },
  { id: "boot-loop", name: "Stuck in Boot Loop", description: "Device keeps restarting and won't boot properly", categories: ["MacBook", "iPhone", "iPad"] },

  // Audio issues
  { id: "speaker-issue", name: "Speaker Not Working", description: "Internal speaker produces no sound or distorted audio", categories: ["MacBook", "iPhone", "iPad", "AirPods"] },
  { id: "microphone-issue", name: "Microphone Not Working", description: "Microphone is not picking up sound", categories: ["MacBook", "iPhone", "iPad", "AirPods"] },
  { id: "one-airpod-dead", name: "One AirPod Not Working", description: "Only one AirPod is producing sound", categories: ["AirPods"] },

  // Camera issues
  { id: "camera-not-working", name: "Camera Not Working", description: "Front or rear camera is not functioning", categories: ["MacBook", "iPhone", "iPad"] },
  { id: "camera-blurry", name: "Blurry Camera / Focus Issue", description: "Camera produces blurry images or won't focus", categories: ["iPhone", "iPad"] },

  // Water / Physical damage
  { id: "water-damage", name: "Water / Liquid Damage", description: "Device has been exposed to water or liquid", categories: ["MacBook", "iPhone", "iPad", "Apple Watch", "AirPods"] },
  { id: "physical-damage", name: "Physical / Drop Damage", description: "Device has been dropped or physically damaged", categories: ["MacBook", "iPhone", "iPad", "Apple Watch", "AirPods"] },

  // Software issues
  { id: "software-issue", name: "Software / OS Issue", description: "Operating system errors, update failures, or software crashes", categories: ["MacBook", "iPhone", "iPad", "Apple Watch"] },
  { id: "data-recovery", name: "Data Recovery", description: "Need to recover lost or deleted data", categories: ["MacBook", "iPhone", "iPad"] },
  { id: "virus-malware", name: "Virus / Malware Removal", description: "Device infected with virus or malware", categories: ["MacBook"] },

  // Keyboard / Trackpad (MacBook specific)
  { id: "keyboard-issue", name: "Keyboard Not Working", description: "Keys not responding or keyboard malfunction", categories: ["MacBook"] },
  { id: "trackpad-issue", name: "Trackpad Not Working", description: "Trackpad not responding or clicking issues", categories: ["MacBook"] },

  // Connectivity
  { id: "wifi-issue", name: "WiFi Not Working", description: "Cannot connect to WiFi networks", categories: ["MacBook", "iPhone", "iPad", "Apple Watch"] },
  { id: "bluetooth-issue", name: "Bluetooth Not Working", description: "Bluetooth connectivity issues", categories: ["MacBook", "iPhone", "iPad", "Apple Watch", "AirPods"] },
  { id: "cellular-issue", name: "Cellular / Network Issue", description: "No signal or cellular data not working", categories: ["iPhone", "iPad"] },

  // Other
  { id: "face-id", name: "Face ID Not Working", description: "Face ID or Touch ID not functioning", categories: ["iPhone", "iPad"] },
  { id: "button-issue", name: "Button Not Working", description: "Power, volume, or home button malfunction", categories: ["iPhone", "iPad", "Apple Watch"] },
  { id: "other", name: "Other Issue", description: "Issue not listed above", categories: ["MacBook", "iPhone", "iPad", "Apple Watch", "AirPods", "Non-Apple"] },
];

export function getIssuesForCategory(category: DeviceCategory): DeviceIssue[] {
  return DEVICE_ISSUES.filter(issue => issue.categories.includes(category));
}

export function getModelsForCategory(category: Exclude<DeviceCategory, "Non-Apple">): DeviceModel[] {
  return APPLE_DEVICE_MODELS[category] || [];
}

export function isAppleDevice(category: DeviceCategory): boolean {
  return category !== "Non-Apple";
}
