import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCollection(name: string) {
  const item = localStorage.getItem(name)

  if (item === null) {
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
    throw new Error(`The value of ${name} is not an array`)
  }
}
