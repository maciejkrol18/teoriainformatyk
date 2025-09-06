import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function declension(amount: number, a: string, b: string, c: string) {
  const parsedAmount = Math.abs(amount);
  if (parsedAmount === 1) {
    return a;
  }
  if (
    parsedAmount % 10 > 1 &&
    parsedAmount % 10 < 5 &&
    !(parsedAmount % 100 >= 10 && parsedAmount % 100 <= 21)
  ) {
    return b;
  }
  return c || b;
}
