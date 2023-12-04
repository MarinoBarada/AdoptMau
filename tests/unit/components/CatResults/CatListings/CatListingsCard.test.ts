import { render, screen } from "@testing-library/vue";

import type { Cat } from "@/api/types";
import CatListingsCard from "@/components/CatResults/CatListings/CatListingsCard.vue";

import { createCat } from "../../../../../utils/createCat";

describe("CatListingsCard", () => {
  const renderCatListingsCard = (cat: Cat) => {
    render(CatListingsCard, {
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
});