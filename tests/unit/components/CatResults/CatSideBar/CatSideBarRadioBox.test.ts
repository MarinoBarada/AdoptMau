import type { Mock } from "vitest";
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import CatSideBarRadioBox from "@/components/CatResults/CatSideBar/CatSideBarRadioBox.vue";
import { useUserStore } from "@/stores/user";
import type { SortBy } from "@/api/types";

describe("CatSideBarRadioBox", () => {
  interface CatSideBarRadioBoxProps {
    sorts: Array<SortBy>;
    name: String;
    action: Mock;
  };

  const createProps = (props: Partial<CatSideBarRadioBoxProps> = {}
  ): CatSideBarRadioBoxProps => ({
    sorts: [
      { name: "Age", value: true },
      { name: "Name", value: false },
    ],
    name: "sortBy",
    action: vi.fn(),
    ...props
  });

  const renderCatSideBarRadioBox = (
    props: CatSideBarRadioBoxProps
  ) => {
    const pinia = createTestingPinia({ stubActions: false });
    const userStore = useUserStore();

    render(CatSideBarRadioBox, {
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
        { name: "Age", value: true },
        { name: "Name", value: false },
      ]
    });
    renderCatSideBarRadioBox(props);

    const sortListItems = screen.getAllByRole("listitem");
    const sortTypes = sortListItems.map((node) => {
      if (node.textContent != null)
        return node.textContent.trim()
    });

    expect(sortTypes).toEqual(["Age", "Name"]);
  });

  describe("when user click radio box", () => {
    it("communicate that user has selected radio box", async () => {
      const action = vi.fn();
      const props = createProps({
        sorts: [
          { name: "Ascending", value: true },
          { name: "Descending", value: false },
        ],
        action
      });
      renderCatSideBarRadioBox(props);

      const nameRadioBox = screen.getByRole("radio", {
        name: /descending/i
      });

      await userEvent.click(nameRadioBox);

      expect(action).toHaveBeenCalledWith("Descending");
    });
  })
});