import { createPinia, setActivePinia } from "pinia";
import type { Mock } from "vitest";
import axios from "axios";

import { useCatsStore } from "@/stores/cats";

vi.mock("axios");
const axiosGetMock = axios.get as Mock;

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("stores all cats", () => {
    const store = useCatsStore();
    expect(store.cats).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("FETCH_CATS", () => {
    it("makes API request and stores received cats", async () => {
      axiosGetMock.mockResolvedValue({
        data: [
          {
            id: 1,
            name: "Fluffy",
            age: 3,
            color: "gray",
            picture: "https://cat-image"
          }
        ]
      });
      const store = useCatsStore();
      await store.FETCH_CATS();
      expect(store.cats).toEqual([
        {
          id: 1,
          name: "Fluffy",
          age: 3,
          color: "gray",
          picture: "https://cat-image"
        }
      ]);
    });
  });

});