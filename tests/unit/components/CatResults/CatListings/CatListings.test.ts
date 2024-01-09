import { render, screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import { RouterLinkStub } from "@vue/test-utils";

import CatListings from "@/components/CatResults/CatListings/CatListings.vue";
import { useCatsStore } from "@/stores/cats";

describe("CatListings", () => {
  const renderCatListings = (number: number) => {
    const pinia = createTestingPinia();
    const catStore = useCatsStore();
    /// @ts-expect-error
    catStore.FILTERED_CATS = Array(number).fill({});
    catStore.seeMore = 1;

    render(CatListings, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub
        },
        plugins: [pinia],
      }
    });
  };

  it("displays maximum of 20 cats", async () => {
    renderCatListings(25);
    const catListings = await screen.findAllByRole("listitem");
    expect(catListings).toHaveLength(20);
  });

  describe("when a FILTERED_CATS array length is > 20", () => {
    it("displays see more button", async () => {
      renderCatListings(25);

      await screen.findAllByRole("listitem");

      const seeMoreButton = screen.queryByRole("button", {
        name: /see more/i
      });

      expect(seeMoreButton).toBeInTheDocument();
    });
  });

  describe("when a FILTERED_CATS array length is 0", () => {
    it("displays a div that warn user that cat with that filters do not exist", () => {
      renderCatListings(0);

      expect(screen.queryByText("Unfortunately the cat you were looking for does not exist!")).toBeInTheDocument();
      expect(screen.queryByText("Try changing the filters!")).toBeInTheDocument();
    });
  });
});