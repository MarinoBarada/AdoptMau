import type { Cat } from "@/api/types";

export const createCat = (cat: Partial<Cat> = {}): Cat => ({
  id: 1,
  name: "Fluffy",
  age: 3,
  color: "gray",
  picture: "https://cat-image",
  adopted: false
  ...cat,
})