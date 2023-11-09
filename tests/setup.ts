import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/vue";
import { afterEach } from "vitest";

afterEach(() => {
  // cleanup koji preventira da stari testovi utječu na nove
  cleanup();
});
