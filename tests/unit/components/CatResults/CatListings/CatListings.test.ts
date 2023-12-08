import { render, screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import { RouterLinkStub } from "@vue/test-utils";

import CatListings from "@/components/CatResults/CatListings/CatListings.vue";
import { useCatsStore } from "@/stores/cats";
import { useUserStore } from "@/stores/user";

describe("CatListings", () => {
  const renderCatListings = () => {
    const pinia = createTestingPinia();
    const catStore = useCatsStore();
    const userStore = useUserStore();
    /// @ts-expect-error
    catStore.FILTERED_CATS = Array(25).fill({});
    userStore.seeMore = 1;

    render(CatListings, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub
        },
        plugins: [pinia],
      }
    });

    return { catStore, userStore };
  };

  it("displays maximum of 20 cats", async () => {
    const { catStore } = renderCatListings();

    /// @ts-expect-error
    catStore.FILTERED_CATS = Array(25).fill({});
    const catListings = await screen.findAllByRole("listitem");
    expect(catListings).toHaveLength(20);
  });

  describe("when a FILTERED_CATS array length is > 20", () => {
    it("displays see more button", async () => {
      const { catStore, userStore } = renderCatListings();

      /// @ts-expect-error
      catStore.FILTERED_CATS = Array(25).fill({});
      userStore.seeMore = 1;
      await screen.findAllByRole("listitem");

      const seeMoreButton = screen.queryByRole("button", {
        name: /see more/i
      });

      expect(seeMoreButton).toBeInTheDocument();
    });
  });

  describe("when a FILTERED_CATS array length is 0", () => {
    it("displays a div that warn user that cat with that filters do not exist", () => {
      const { catStore } = renderCatListings();

      /// @ts-expect-error
      catStore.FILTERED_CATS = Array(0).fill({});
      expect(screen.findByText("Unfortunately the cat you were looking for does not exist!")).toBeInTheDocument;
      expect(screen.findByText("Try changing the filters!")).toBeInTheDocument;
    });
  });
});