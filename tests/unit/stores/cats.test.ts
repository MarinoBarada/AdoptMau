import { createPinia, setActivePinia } from "pinia";
import type { Mock } from "vitest";
import axios from "axios";

import { useCatsStore } from "@/stores/cats";
import { useUserStore } from "@/stores/user";
import { createCat } from "../../utils/createCat";

vi.mock("axios");
const axiosGetMock = axios.get as Mock;
const axiosPatchMock = axios.patch as Mock;
const axiosPostMock = axios.post as Mock;
const axiosDeleteMock = axios.delete as Mock;
const axiosPutMock = axios.put as Mock;

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
            picture: "https://cat-image",
            adopted: false,
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
          picture: "https://cat-image",
          adopted: false,
        }
      ]);
    });
  });

  describe("ADOPT_CAT", () => {
    it("adopt cat by sending a id of a cat we wont to adopt", async () => {
      axiosPatchMock.mockResolvedValue({
        data: [
          {
            id: 1,
            name: "Fluffy",
            age: 3,
            color: "gray",
            picture: "https://cat-image",
            adopted: false,
          }
        ]
      });
      const store = useCatsStore();
      await store.ADOPT_CAT(1);
      expect(axios.patch).toHaveBeenCalledWith("http://myfakeapi.com/cats/1", { adopted: true, });
    });
  });

  describe("CREATE_NEW_CAT", () => {
    it("creates new cat and store it to mock backend", async () => {
      axiosPostMock.mockRejectedValue;
      const cat = {
        id: 1,
        name: "Fluffy The III",
        age: 3,
        color: "black",
        picture: "https://cat-url",
        adopted: false,
      };

      const store = useCatsStore();
      await store.CREATE_NEW_CAT(cat);
      expect(axios.post).toHaveBeenCalledWith("http://myfakeapi.com/cats", cat);
    });
  });

  describe("DELETE_CAT", () => {
    it("delete cat with id we provide and remove it from mock backend", async () => {
      axiosDeleteMock.mockRejectedValue;

      const store = useCatsStore();
      await store.DELETE_CAT(1);
      expect(axios.delete).toHaveBeenCalledWith("http://myfakeapi.com/cats/1");
    });
  });

  describe("EDIT_CAT", () => {
    it("edit cat with id we provide and object with new information and edit it in mock backend", async () => {
      axiosPutMock.mockRejectedValue;
      const cat = {
        id: 1,
        name: "Fluffy The III",
        age: 3,
        color: "black",
        picture: "https://cat-url",
        adopted: false,
      };

      const store = useCatsStore();
      await store.EDIT_CAT(1, cat);
      expect(axios.put).toHaveBeenCalledWith("http://myfakeapi.com/cats/1", cat);
    });
  });

  describe("GET_SPECIFIC_CAT", () => {
    describe("when cat we are looking for exist", () => {
      it("return a object of a cat with id we provide", () => {
        const store = useCatsStore();
        store.cats = [
          {
            id: 1,
            name: "Fluffy The III",
            age: 3,
            color: "black",
            picture: "https://cat-url",
            adopted: false,
          }
        ];

        const catWithId1 = store.GET_SPECIFIC_CAT(1);
        expect(catWithId1).toEqual({
          id: 1,
          name: "Fluffy The III",
          age: 3,
          color: "black",
          picture: "https://cat-url",
          adopted: false,
        });
      });
    });

    describe("when cat we are looking for do not exist", () => {
      it("return a empty object", () => {
        const store = useCatsStore();
        store.cats = [
          {
            id: 1,
            name: "Fluffy The III",
            age: 3,
            color: "black",
            picture: "https://cat-url",
            adopted: false,
          }
        ];

        const catWithId2 = store.GET_SPECIFIC_CAT(2);
        expect(catWithId2).toEqual({});
      });
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