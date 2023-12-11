import { render, screen } from "@testing-library/vue";
import { createPinia, setActivePinia } from "pinia";
import { RouterLinkStub } from "@vue/test-utils";

import { useUserStore } from "@/stores/user";
import TheHeader from "@/components/Header/TheHeader.vue";

vi.mock("vue-router");

describe("TheHeader", () => {
  const renderTheHeader = () => {
    setActivePinia(createPinia());

    render(TheHeader, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub
        }
      }
    });
  };

  it("renders company name", () => {
    renderTheHeader();
    expect(screen.getByText("AdoptMau")).toBeInTheDocument();
  });

  describe("when admin is login", () => {
    it("renders a dropdown for admin where he can logout and add new cat", async () => {
      renderTheHeader();

      const userStore = useUserStore();
      userStore.adminIsLogin = true;

      const dropdown = await screen.findByTestId("dropdown");
      expect(dropdown).toBeInTheDocument();
      expect(await screen.queryByTestId("user-info")).not.toBeInTheDocument();
    });
  });

  describe("when admin is not login", () => {
    it("renders a user icon to alow admin to login when he click that icon", () => {
      renderTheHeader();

      const userStore = useUserStore();
      userStore.adminIsLogin = false;
      expect(screen.queryByTestId("user-info")).toBeInTheDocument();
    });
  });

});