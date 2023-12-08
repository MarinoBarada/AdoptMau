import { render, screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import { RouterLinkStub } from "@vue/test-utils";

import type { Cat } from "@/api/types";
import CatListingsCard from "@/components/CatResults/CatListings/CatListingsCard.vue";
import { useUserStore } from "@/stores/user";

import { createCat } from "../../../../utils/createCat";

describe("CatListingsCard", () => {
  const renderCatListingsCard = (cat: Cat) => {
    const pinia = createTestingPinia();

    render(CatListingsCard, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub
        },
        plugins: [pinia],
      },
      props: {
        cat: {
          ...cat
        }
      }
    });
  };

  it("renders cat name", () => {
    const catProps = createCat({ name: "Pumpkin" });
    renderCatListingsCard(catProps);

    expect(screen.getByText("Pumpkin")).toBeInTheDocument;
  });

  it("renders cat age", () => {
    const catProps = createCat({ age: 1 });
    renderCatListingsCard(catProps);

    expect(screen.getByText("1 months")).toBeInTheDocument;
  });

  it("renders cat color", () => {
    const catProps = createCat({ color: "orange" });
    renderCatListingsCard(catProps);

    expect(screen.getByText("orange")).toBeInTheDocument;
  });

  describe("when admin has not logged in", () => {
    it("do not render edit and delete buttons", () => {
      const userStore = useUserStore();

      userStore.adminIsLogin = false;
      expect(screen.findByText("EDIT")).not.toBeInTheDocument;
      expect(screen.findByText("DELETE")).not.toBeInTheDocument;
    });

    it("render a adopt button", () => {
      const userStore = useUserStore();

      userStore.adminIsLogin = false;
      expect(screen.findByText("ADOPT")).toBeInTheDocument;
    })
  });

  describe("when admin has logged in", () => {
    it("render edit and delete buttons", () => {
      const userStore = useUserStore();

      userStore.adminIsLogin = true;
      expect(screen.findByText("EDIT")).toBeInTheDocument;
      expect(screen.findByText("DELETE")).toBeInTheDocument;
    });

    it("do not render a adopt button", () => {
      const userStore = useUserStore();

      userStore.adminIsLogin = true;
      expect(screen.findByText("ADOPT")).not.toBeInTheDocument;
    })
  });
});