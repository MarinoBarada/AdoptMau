//CatSideBarCheckBox
import type { Mock } from "vitest";
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import CatSideBarCheckBox from "@/components/CatResults/CatSideBar/CatSideBarCheckBox.vue";
import { useUserStore } from "@/stores/user";
import type { SortBy } from "@/api/types";

describe("CatSideBarCheckBox", () => {
  interface CatSideBarCheckBoxProps {
    sorts: Array<SortBy>;
    action: Mock;
  };

  const createProps = (props: Partial<CatSideBarCheckBoxProps> = {}
  ): CatSideBarCheckBoxProps => ({
    sorts: [
      { name: "Younger than 6 months", value: false },
      { name: "Younger than 12 months", value: false },
      { name: "Black for color", value: false }
    ],
    action: vi.fn(),
    ...props
  });

  const renderCatSideBarRadioBox = (
    props: CatSideBarCheckBoxProps
  ) => {
    const pinia = createTestingPinia({ stubActions: false });
    const userStore = useUserStore();

    render(CatSideBarCheckBox, {
      props: {
        ...props
      },
      global: {
        plugins: [pinia]
      }
    });

    return { userStore };
  };

  it("renders unique list of values", () => {
    const props = createProps({
      sorts: [
        { name: "Younger than 6 months", value: false },
        { name: "Younger than 12 months", value: false },
        { name: "Black for color", value: false }
      ]
    });
    renderCatSideBarRadioBox(props);

    const filterListItems = screen.getAllByRole("listitem");
    const filterTypes = filterListItems.map((node) => {
      if (node.textContent != null)
        return node.textContent.trim()
    });

    expect(filterTypes).toEqual(["Younger than 6 months", "Younger than 12 months", "Black for color"]);
  });

  describe("when user click checkbox", () => {
    it("communicate that user has selected checkbox", async () => {
      const action = vi.fn();
      const props = createProps({
        sorts: [
          { name: "Younger than 6 months", value: false },
          { name: "Younger than 12 months", value: false },
          { name: "Black for color", value: false }
        ],
        action
      });
      renderCatSideBarRadioBox(props);

      const nameCheckBox = screen.getByRole("checkbox", {
        name: /younger than 12 months/i
      });

      await userEvent.click(nameCheckBox);

      expect(action).toHaveBeenCalledWith("Younger than 12 months");
    });
  })
});