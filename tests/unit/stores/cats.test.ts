import { createPinia, setActivePinia } from "pinia";
import type { Mock } from "vitest";
import axios from "axios";

import { useCatsStore } from "@/stores/cats";
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

  it("stores user's sort choice by age and name", () => {
    const store = useCatsStore();
    expect(store.sortBy).toEqual([
      { name: "Age", value: true },
      { name: "Name", value: false },
    ]);
  });

  it("stores user's filter choice by adopted", () => {
    const store = useCatsStore();
    expect(store.filterByAdopted).toEqual([
      { name: "Adopted", value: false },
    ]);
  });

  it("stores user's sort choice by type ascending and descending", () => {
    const store = useCatsStore();
    expect(store.sortByOrder).toEqual([
      { name: "Ascending", value: true },
      { name: "Descending", value: false },
    ]);
  });

  it("stores user's filters choice", () => {
    const store = useCatsStore();
    expect(store.filterCats).toEqual([
      { name: "Younger than 6 months", value: false },
      { name: "Younger than 12 months", value: false },
      { name: "Black for color", value: false }
    ]);
  });

  it("stores user's search term for name of cat", () => {
    const store = useCatsStore();
    expect(store.nameSearch).toBe("");
  });

  it("stores user's click on see more button", () => {
    const store = useCatsStore();
    expect(store.seeMore).toBe(1);
  });

  it("stores data if fetch is successful", () => {
    const store = useCatsStore();
    expect(store.fetchSuccessful).toBe(true);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("HANDLE_CHANGE_SORTBY", () => {
    it("keeps track of user sort by age and name choice", () => {
      const store = useCatsStore();
      store.sortBy = [
        { name: "Age", value: true },
        { name: "Name", value: false },
      ];
      store.HANDLE_CHANGE_SORTBY("Name");
      expect(store.sortBy).toEqual([
        { name: "Age", value: false },
        { name: "Name", value: true },
      ]);
    });
  });

  describe("HANDLE_CHANGE_SORTBY_ORDER", () => {
    it("keeps track of user sort by type choice, ascending and descending", () => {
      const store = useCatsStore();
      store.sortByOrder = [
        { name: "Ascending", value: true },
        { name: "Descending", value: false },
      ];
      store.HANDLE_CHANGE_SORTBY_ORDER("Descending");
      expect(store.sortByOrder).toEqual([
        { name: "Ascending", value: false },
        { name: "Descending", value: true },
      ]);
    });
  });

  describe("HANDLE_FILTERS", () => {
    it("keeps track of user filter choices", () => {
      const store = useCatsStore();
      store.filterCats = [
        { name: "Younger than 6 months", value: false },
        { name: "Younger than 12 months", value: false },
        { name: "Black for color", value: false }
      ];
      store.HANDLE_FILTERS("Black for color");
      expect(store.filterCats).toEqual([
        { name: "Younger than 6 months", value: false },
        { name: "Younger than 12 months", value: false },
        { name: "Black for color", value: true }
      ]);
    });
  });

  describe("HANDLE_CHANGE_FILTER_BY_ADOPTED", () => {
    it("keeps track of user filter choices by adopted", () => {
      const store = useCatsStore();
      store.filterByAdopted = [
        { name: "Adopted", value: false },
      ];
      store.HANDLE_CHANGE_FILTER_BY_ADOPTED("Adopted");
      expect(store.filterByAdopted).toEqual([
        { name: "Adopted", value: true },
      ]);
    });
  });

  describe("UPDATE_NAME_SEARCH", () => {
    it("receives search term for cats name the user has entered", () => {
      const store = useCatsStore();
      store.nameSearch = "";
      store.UPDATE_NAME_SEARCH("Chewbacca");
      expect(store.nameSearch).toBe("Chewbacca");
    });
  });

  describe("CLICK_SEE_MORE", () => {
    describe("when user click on see more button", () => {
      it("increment seeMore variable in store", () => {
        const store = useCatsStore();
        store.seeMore = 1;
        store.CLICK_SEE_MORE();
        expect(store.seeMore).toBe(2);
      });

      it("set sort by age and name to be sorted by age", () => {
        const store = useCatsStore();
        store.sortBy = [
          { name: "Age", value: false },
          { name: "Name", value: true },
        ];
        store.CLICK_SEE_MORE();
        expect(store.sortBy).toEqual([
          { name: "Age", value: true },
          { name: "Name", value: false },
        ]);
      });

      it("set sort by type ascending and descending to be sorted by ascending", () => {
        const store = useCatsStore();
        store.sortBy = [
          { name: "Ascending", value: false },
          { name: "Descending", value: true },
        ];
        store.CLICK_SEE_MORE();
        expect(store.sortByOrder).toEqual([
          { name: "Ascending", value: true },
          { name: "Descending", value: false },
        ]);
      });
    });
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
        const store = useCatsStore();
        store.filterCats = [
          { name: "Younger than 6 months", value: false },
          { name: "Younger than 12 months", value: false },
          { name: "Black for color", value: false }
        ];
        const cat = createCat({ age: 7 });

        const result = store.INCLUDE_CATS_YOUNGER_THEN_6(cat);
        expect(result).toBe(true);
      });
    });

    it("identifies if cat is younger than 6 months (age <= 6)", () => {
      const store = useCatsStore();
      store.filterCats = [
        { name: "Younger than 6 months", value: true },
        { name: "Younger than 12 months", value: false },
        { name: "Black for color", value: false }
      ];
      const cat = createCat({ age: 5 });

      const result = store.INCLUDE_CATS_YOUNGER_THEN_6(cat);
      expect(result).toBe(true);
    });
  });

  describe("INCLUDE_CATS_YOUNGER_THEN_12", () => {
    describe("when the user has not selected any filter 'Younger than 12 months'", () => {
      it("includes cat", () => {
        const store = useCatsStore();
        store.filterCats = [
          { name: "Younger than 6 months", value: false },
          { name: "Younger than 12 months", value: false },
          { name: "Black for color", value: false }
        ];
        const cat = createCat({ age: 20 });

        const result = store.INCLUDE_CATS_YOUNGER_THEN_12(cat);
        expect(result).toBe(true);
      });
    });

    it("identifies if cat is younger than 12 months (age <= 12)", () => {
      const store = useCatsStore();
      store.filterCats = [
        { name: "Younger than 6 months", value: false },
        { name: "Younger than 12 months", value: true },
        { name: "Black for color", value: false }
      ];
      const cat = createCat({ age: 10 });

      const result = store.INCLUDE_CATS_YOUNGER_THEN_12(cat);
      expect(result).toBe(true);
    });
  });

  describe("INCLUDE_CATS_COLOR_BLACK", () => {
    describe("when the user has not selected any filter 'Black for color'", () => {
      it("includes cat", () => {
        const store = useCatsStore();
        store.filterCats = [
          { name: "Younger than 6 months", value: false },
          { name: "Younger than 12 months", value: false },
          { name: "Black for color", value: false }
        ];
        const cat = createCat({ color: "gray" });

        const result = store.INCLUDE_CATS_COLOR_BLACK(cat);
        expect(result).toBe(true);
      });
    });

    it("identifies if cat is black color", () => {
      const store = useCatsStore();
      store.filterCats = [
        { name: "Younger than 6 months", value: false },
        { name: "Younger than 12 months", value: false },
        { name: "Black for color", value: true }
      ];
      const cat = createCat({ color: "black" });

      const result = store.INCLUDE_CATS_COLOR_BLACK(cat);
      expect(result).toBe(true);
    });
  });

  describe("INCLUDE_CATS_BY_NAME", () => {
    it("includes if cat name matches user's entry", () => {
      const store = useCatsStore();
      store.nameSearch = "Ore"
      const cat = createCat({ name: "Oreo" });

      const result = store.INCLUDE_CATS_BY_NAME(cat);
      expect(result).toBe(true);
    });

    it("handles inconsistent character casing", () => {
      const store = useCatsStore();
      store.nameSearch = "orE"
      const cat = createCat({ name: "Oreo" });

      const result = store.INCLUDE_CATS_BY_NAME(cat);
      expect(result).toBe(true);
    });

    describe("when the user has not entered any name", () => {
      it("includes cat", () => {
        const store = useCatsStore();
        store.nameSearch = ""
        const cat = createCat({ name: "Oreo" });

        const result = store.INCLUDE_CATS_BY_NAME(cat);
        expect(result).toBe(true);
      });
    });
  });
});