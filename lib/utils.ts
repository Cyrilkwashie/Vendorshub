type ClassDictionary = Record<string, boolean>;
type ClassValue =
  | string
  | null
  | undefined
  | false
  | ClassDictionary
  | ClassValue[];

function flattenClassValue(value: ClassValue): string[] {
  if (!value) {
    return [];
  }

  if (typeof value === "string") {
    return [value];
  }

  if (Array.isArray(value)) {
    return value.flatMap(flattenClassValue);
  }

  return Object.entries(value)
    .filter(([, enabled]) => enabled)
    .map(([className]) => className);
}

export function cn(...values: ClassValue[]) {
  return values.flatMap(flattenClassValue).join(" ");
}

export function formatGHS(value: number) {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}