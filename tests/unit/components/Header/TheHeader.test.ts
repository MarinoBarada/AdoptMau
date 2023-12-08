import { render, screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import { RouterLinkStub } from "@vue/test-utils";

import { useUserStore } from "@/stores/user";
import TheHeader from "@/components/Header/TheHeader.vue";

vi.mock("vue-router");

describe("TheHeader", () => {
  const renderTheHeader = () => {
    const pinia = createTestingPinia();

    render(TheHeader, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub
        },
        plugins: [pinia],
      }
    });
  };

  it("renders company name", () => {
    renderTheHeader();
    expect(screen.getByText("AdoptMau")).toBeInTheDocument;
  });

  describe("when admin is login", () => {
    it("renders a dropdown for admin where he can logout and add new cat", () => {
      const userStore = useUserStore();

      userStore.adminIsLogin = true;
      const dropdown = screen.findByRole("button", {
        name: /admin/i
      });
      expect(dropdown).toBeInTheDocument;
      expect(screen.findByTitle("user-info")).not.toBeInTheDocument;
    });
  });

  describe("when admin is not login", () => {
    it("renders a user icon to alow admin to login when he click that icon", () => {
      const userStore = useUserStore();

      userStore.adminIsLogin = false;
      expect(screen.findByTitle("user-info")).toBeInTheDocument;
    });
  });

});