import { createPinia, setActivePinia } from "pinia";

import { useUserStore } from "@/stores/user";

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("stores user's sort choice by age and name", () => {
    const store = useUserStore();
    expect(store.sortBy).toEqual([
      { name: "Age", value: true },
      { name: "Name", value: false },
    ]);
  });

  it("stores user's filter choice by adopted", () => {
    const store = useUserStore();
    expect(store.filterByAdopted).toEqual([
      { name: "Adopted", value: false },
    ]);
  });

  it("stores user's sort choice by type ascending and descending", () => {
    const store = useUserStore();
    expect(store.sortByType).toEqual([
      { name: "Ascending", value: true },
      { name: "Descending", value: false },
    ]);
  });

  it("stores user's filters choice", () => {
    const store = useUserStore();
    expect(store.filterCats).toEqual([
      { name: "Younger than 6 months", value: false },
      { name: "Younger than 12 months", value: false },
      { name: "Black for color", value: false }
    ]);
  });

  it("stores user's search term for name of cat", () => {
    const store = useUserStore();
    expect(store.nameSearch).toBe("");
  });

  it("stores user's click on see more button", () => {
    const store = useUserStore();
    expect(store.seeMore).toBe(1);
  });

  it("stores if user is login or not", () => {
    const store = useUserStore();
    expect(store.adminIsLogin).toBe(false);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("HANDLE_CHANGE_SORTBY", () => {
    it("keeps track of user sort by age and name choice", () => {
      const store = useUserStore();
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

  describe("HANDLE_CHANGE_SORTBY_TYPE", () => {
    it("keeps track of user sort by type choice, ascending and descending", () => {
      const store = useUserStore();
      store.sortByType = [
        { name: "Ascending", value: true },
        { name: "Descending", value: false },
      ];
      store.HANDLE_CHANGE_SORTBY_TYPE("Descending");
      expect(store.sortByType).toEqual([
        { name: "Ascending", value: false },
        { name: "Descending", value: true },
      ]);
    });
  });

  describe("HANDLE_FILTERS", () => {
    it("keeps track of user filter choices", () => {
      const store = useUserStore();
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
      const store = useUserStore();
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
      const store = useUserStore();
      store.nameSearch = "";
      store.UPDATE_NAME_SEARCH("Chewbacca");
      expect(store.nameSearch).toBe("Chewbacca");
    });
  });

  describe("CLICK_SEE_MORE", () => {
    describe("when user click on see more button", () => {
      it("increment seeMore variable in store", () => {
        const store = useUserStore();
        store.seeMore = 1;
        store.CLICK_SEE_MORE();
        expect(store.seeMore).toBe(2);
      });

      it("set sort by age and name to be sorted by age", () => {
        const store = useUserStore();
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
        const store = useUserStore();
        store.sortBy = [
          { name: "Ascending", value: false },
          { name: "Descending", value: true },
        ];
        store.CLICK_SEE_MORE();
        expect(store.sortByType).toEqual([
          { name: "Ascending", value: true },
          { name: "Descending", value: false },
        ]);
      });
    });
  });

  describe("ADMIN_LOGIN_LOGOUT", () => {
    it("change adminIsLogin from false to true when admin login", () => {
      const store = useUserStore();
      store.filterByAdopted[0].value = false;
      store.adminIsLogin = false;
      store.ADMIN_LOGIN_LOGOUT();
      expect(store.adminIsLogin).toBe(true);
      expect(store.filterByAdopted[0].value).toBe(false);
    });

    it("change adminIsLogin from true to false when admin logout", () => {
      const store = useUserStore();
      store.filterByAdopted[0].value = true;
      store.adminIsLogin = true;
      store.ADMIN_LOGIN_LOGOUT();
      expect(store.adminIsLogin).toBe(false);
      expect(store.filterByAdopted[0].value).toBe(false);
    });
  });
});