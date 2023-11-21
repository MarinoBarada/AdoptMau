import { createPinia, setActivePinia } from "pinia";
import type { Mock } from "vitest";
import axios from "axios";

import { useCatsStore } from "@/stores/cats";
import { useUserStore } from "@/stores/user";
import { createCat } from "../../utils/createCat";

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

describe("getters", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("INCLUDE_CATS_YOUNGER_THEN_6", () => {
    describe("when the user has not selected any filter 'Younger than 6 months'", () => {
      it("includes cat", () => {
        const userStore = useUserStore();
        userStore.filterCats = [
          { name: "Younger than 6 months", value: false },
          { name: "Younger than 12 months", value: false },
          { name: "Black for color", value: false }
        ];
        const store = useCatsStore();
        const cat = createCat({ age: 7 });

        const result = store.INCLUDE_CATS_YOUNGER_THEN_6(cat);
        expect(result).toBe(true);
      });
    });

    it("identifies if cat is younger than 6 months (age <= 6)", () => {
      const userStore = useUserStore();
      userStore.filterCats = [
        { name: "Younger than 6 months", value: true },
        { name: "Younger than 12 months", value: false },
        { name: "Black for color", value: false }
      ];
      const store = useCatsStore();
      const cat = createCat({ age: 5 });

      const result = store.INCLUDE_CATS_YOUNGER_THEN_6(cat);
      expect(result).toBe(true);
    });
  });

  describe("INCLUDE_CATS_YOUNGER_THEN_12", () => {
    describe("when the user has not selected any filter 'Younger than 12 months'", () => {
      it("includes cat", () => {
        const userStore = useUserStore();
        userStore.filterCats = [
          { name: "Younger than 6 months", value: false },
          { name: "Younger than 12 months", value: false },
          { name: "Black for color", value: false }
        ];
        const store = useCatsStore();
        const cat = createCat({ age: 20 });

        const result = store.INCLUDE_CATS_YOUNGER_THEN_12(cat);
        expect(result).toBe(true);
      });
    });

    it("identifies if cat is younger than 12 months (age <= 12)", () => {
      const userStore = useUserStore();
      userStore.filterCats = [
        { name: "Younger than 6 months", value: false },
        { name: "Younger than 12 months", value: true },
        { name: "Black for color", value: false }
      ];
      const store = useCatsStore();
      const cat = createCat({ age: 10 });

      const result = store.INCLUDE_CATS_YOUNGER_THEN_12(cat);
      expect(result).toBe(true);
    });
  });

  describe("INCLUDE_CATS_COLOR_BLACK", () => {
    describe("when the user has not selected any filter 'Black for color'", () => {
      it("includes cat", () => {
        const userStore = useUserStore();
        userStore.filterCats = [
          { name: "Younger than 6 months", value: false },
          { name: "Younger than 12 months", value: false },
          { name: "Black for color", value: false }
        ];
        const store = useCatsStore();
        const cat = createCat({ color: "gray" });

        const result = store.INCLUDE_CATS_COLOR_BLACK(cat);
        expect(result).toBe(true);
      });
    });

    it("identifies if cat is black color", () => {
      const userStore = useUserStore();
      userStore.filterCats = [
        { name: "Younger than 6 months", value: false },
        { name: "Younger than 12 months", value: false },
        { name: "Black for color", value: true }
      ];
      const store = useCatsStore();
      const cat = createCat({ color: "black" });

      const result = store.INCLUDE_CATS_COLOR_BLACK(cat);
      expect(result).toBe(true);
    });
  });

  describe("INCLUDE_CATS_BY_NAME", () => {
    it("includes if cat name matches user's entry", () => {
      const userStore = useUserStore();
      userStore.nameSearch = "Ore"
      const store = useCatsStore();
      const cat = createCat({ name: "Oreo" });

      const result = store.INCLUDE_CATS_BY_NAME(cat);
      expect(result).toBe(true);
    });

    it("handles inconsistent character casing", () => {
      const userStore = useUserStore();
      userStore.nameSearch = "orE"
      const store = useCatsStore();
      const cat = createCat({ name: "Oreo" });

      const result = store.INCLUDE_CATS_BY_NAME(cat);
      expect(result).toBe(true);
    });

    describe("when the user has not entered any name", () => {
      it("includes cat", () => {
        const userStore = useUserStore();
        userStore.nameSearch = ""
        const store = useCatsStore();
        const cat = createCat({ name: "Oreo" });

        const result = store.INCLUDE_CATS_BY_NAME(cat);
        expect(result).toBe(true);
      });
    });
  });
});