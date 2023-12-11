import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";

import type { Cat } from "@/api/types";
import CatListingsCard from "@/components/CatResults/CatListings/CatListingsCard.vue";
import { createTestingPinia } from "@pinia/testing";

import { useUserStore } from "@/stores/user";

import { createCat } from "../../../../utils/createCat";

describe("CatListingsCard", () => {

  const renderCatListingsCard = (cat: Cat, admin: boolean) => {
    const pinia = createTestingPinia();
    const userStore = useUserStore();
    userStore.adminIsLogin = admin;

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
    return { userStore };
  };

  it("renders cat name", () => {
    const catProps = createCat({ name: "Pumpkin" });
    renderCatListingsCard(catProps, false);

    expect(screen.getByText("Pumpkin")).toBeInTheDocument();
  });

  it("renders cat age", () => {
    const catProps = createCat({ age: 1 });
    renderCatListingsCard(catProps, false);

    expect(screen.getByText("1 months")).toBeInTheDocument();
  });

  it("renders cat color", () => {
    const catProps = createCat({ color: "orange" });
    renderCatListingsCard(catProps, false);

    expect(screen.getByText("orange")).toBeInTheDocument();
  });

  describe("when admin has not logged in", () => {
    it("do not render edit and delete buttons", async () => {
      const catProps = createCat({ name: "Pumpkin" });
      renderCatListingsCard(catProps, false);

      expect(screen.queryByText("EDIT")).not.toBeInTheDocument();
      expect(screen.queryByText("DELETE")).not.toBeInTheDocument();
    });

    it("render a adopt button", () => {
      const catProps = createCat({ name: "Pumpkin" });
      renderCatListingsCard(catProps, false);

      expect(screen.queryByText("ADOPT")).toBeInTheDocument();
    })
  });

  describe("when admin has logged in", () => {
    it("render edit and delete buttons", () => {
      const catProps = createCat({ name: "Pumpkin" });
      renderCatListingsCard(catProps, true);

      expect(screen.queryByText("EDIT")).toBeInTheDocument();
      expect(screen.queryByText("DELETE")).toBeInTheDocument();
    });

    it("do not render a adopt button", () => {
      const catProps = createCat({ name: "Pumpkin" });
      renderCatListingsCard(catProps, true);

      expect(screen.queryByText("ADOPT")).not.toBeInTheDocument();
    });
  });
});