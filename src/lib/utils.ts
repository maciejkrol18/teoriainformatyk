import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCollection(name: string) {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    const item = localStorage.getItem(name)

    if (!item) {
      return []
    }

    let value: unknown

    try {
      value = JSON.parse(item)
    } catch (error) {
      throw new Error(`Failed to JSON parse ${name}`)
    }

    if (Array.isArray(value) && value.every((el) => typeof el === "number")) {
      return value as number[]
    } else {
      throw new Error(`The local storage value of ${name} is not an array of numbers`)
    }
  } else {
    return [] as number[]
  }
}

export function declension(amount: number, a: string, b: string, c: string) {
  amount = Math.abs(amount)
  if (amount === 1) {
    return a
  }
  if (amount % 10 > 1 && amount % 10 < 5 && !(amount % 100 >= 10 && amount % 100 <= 21)) {
    return b
  }
  return c || b
}

export function getURL() {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ??
    process?.env?.NEXT_PUBLIC_VERCEL_URL ??
    "http://localhost:3000/"
  url = url.includes("http") ? url : `https://${url}`
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`
  return url
}
