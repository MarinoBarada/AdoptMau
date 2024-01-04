import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import { useCatsStore } from "@/stores/cats";
import CatSideBarSearchNames from "@/components/CatResults/CatSideBar/CatSideBarSearchNames.vue";

describe("CatSideBarSearchNames", () => {
  const renderCatSideBarSearchNames = () => {
    const pinia = createTestingPinia();
    const catsStore = useCatsStore();

    render(CatSideBarSearchNames, {
      global: {
        plugins: [pinia]
      }
    });

    return { catsStore };
  };

  it("populates search input from store", async () => {
    const { catsStore } = renderCatSideBarSearchNames();
    catsStore.nameSearch = "Oreo";
    const input = await screen.findByRole<HTMLInputElement>("textbox");
    expect(input.value).toBe("Oreo");
  });

  it("writes user input to store", async () => {
    const { catsStore } = renderCatSideBarSearchNames();
    catsStore.nameSearch = "";
    const input = screen.getByRole<HTMLInputElement>("textbox");
    await userEvent.type(input, "O");
    await userEvent.click(document.body);

    expect(catsStore.UPDATE_NAME_SEARCH).toHaveBeenCalledWith("O");
  });

  it("removes whitespace from user input", async () => {
    const { catsStore } = renderCatSideBarSearchNames();
    catsStore.nameSearch = "";
    const input = screen.getByRole<HTMLInputElement>("textbox");
    await userEvent.type(input, "  Oreo   ");
    await userEvent.click(document.body);

    expect(catsStore.UPDATE_NAME_SEARCH).toHaveBeenCalledWith("Oreo");
  });
});