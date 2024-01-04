import { createPinia, setActivePinia } from "pinia";

import { useUserStore } from "@/stores/user";
import { useCatsStore } from "@/stores/cats";

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
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

  describe("ADMIN_LOGIN_LOGOUT", () => {
    it("change adminIsLogin from false to true when admin login", () => {
      const catsStore = useCatsStore();
      const store = useUserStore();
      catsStore.filterByAdopted[0].value = false;
      store.adminIsLogin = false;
      store.ADMIN_LOGIN_LOGOUT();
      expect(store.adminIsLogin).toBe(true);
      expect(catsStore.filterByAdopted[0].value).toBe(false);
    });

    it("change adminIsLogin from true to false when admin logout", () => {
      const catsStore = useCatsStore();
      const store = useUserStore();
      catsStore.filterByAdopted[0].value = true;
      store.adminIsLogin = true;
      store.ADMIN_LOGIN_LOGOUT();
      expect(store.adminIsLogin).toBe(false);
      expect(catsStore.filterByAdopted[0].value).toBe(false);
    });
  });
});