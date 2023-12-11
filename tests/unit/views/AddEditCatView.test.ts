import { render, screen } from "@testing-library/vue";
import { createPinia, setActivePinia } from "pinia";
import userEvent from "@testing-library/user-event";
import { RouterLinkStub } from "@vue/test-utils";
import { useRoute, useRouter } from "vue-router";

import AddEditCatView from "@/views/AddEditCatView.vue";
import type { Mock } from "vitest";

vi.mock("vue-router");
const useRouteMock = useRoute as Mock;
const useRouterMock = useRouter as Mock;

describe("AddEditCatView", () => {
  const renderAddEditCatView = () => {
    setActivePinia(createPinia());
    useRouteMock.mockReturnValue({ params: {} });
    useRouterMock.mockReturnValue({ push: vi.fn() });

    render(AddEditCatView, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub
        },
      }
    });

  };

  describe("form validation (start when user click submit form button)", () => {
    describe("name input", () => {
      it("display error message when name input is empty", async () => {
        renderAddEditCatView();

        const submitButton = screen.getByRole("button");
        expect(submitButton).toBeInTheDocument();

        const nameInput = screen.getByPlaceholderText<HTMLInputElement>("e.g. Oreo, Fluffy Po IV");
        expect(nameInput).toBeInTheDocument();

        await userEvent.type(nameInput, " ");
        await userEvent.click(submitButton);
        expect(await screen.queryByText("Name must be entered!")).toBeInTheDocument();
      });

      it("display error message when name input is not valid", async () => {
        renderAddEditCatView();

        const submitButton = screen.getByRole("button");
        expect(submitButton).toBeInTheDocument();

        const nameInput = screen.getByPlaceholderText<HTMLInputElement>("e.g. Oreo, Fluffy Po IV");
        expect(nameInput).toBeInTheDocument();

        await userEvent.type(nameInput, " Fluffy p ");
        await userEvent.click(submitButton);
        expect(await screen.queryByText("Each word in the name must be a minimum of two letters and the first must be capitalized!")).toBeInTheDocument;
      });

      it("do not display error messages when name input is valid", async () => {
        renderAddEditCatView();

        const submitButton = screen.getByRole("button");
        expect(submitButton).toBeInTheDocument();

        const nameInput = screen.getByPlaceholderText<HTMLInputElement>("e.g. Oreo, Fluffy Po IV");
        expect(nameInput).toBeInTheDocument();

        await userEvent.type(nameInput, " Fluffy Po IV ");
        await userEvent.click(submitButton);
        expect(await screen.queryByText("Each word in the name must be a minimum of two letters and the first must be capitalized!")).not.toBeInTheDocument;
        expect(await screen.queryByText("Name must be entered!")).not.toBeInTheDocument();
      });
    });

    describe("age input", () => {
      it("display error message when age input is < 1", async () => {
        renderAddEditCatView();

        const submitButton = screen.getByRole("button");
        expect(submitButton).toBeInTheDocument();

        const ageInput = screen.getByPlaceholderText<HTMLInputElement>("e.g. 3");
        expect(ageInput).toBeInTheDocument();

        await userEvent.type(ageInput, "0");
        await userEvent.click(submitButton);
        expect(await screen.queryByText("Age is expressed in months and must be >= 1 and &lt;= 360!")).toBeInTheDocument;
      });

      it("display error message when age input is > 360", async () => {
        renderAddEditCatView();

        const submitButton = screen.getByRole("button");
        expect(submitButton).toBeInTheDocument();

        const ageInput = screen.getByPlaceholderText("e.g. 3");
        expect(ageInput).toBeInTheDocument();

        await userEvent.type(ageInput, "365");
        await userEvent.click(submitButton);
        expect(await screen.queryByText("Age is expressed in months and must be >= 1 and &lt;= 360!")).toBeInTheDocument;
      });

      it("do not display error message when age input is >=1 & <= 360", async () => {
        renderAddEditCatView();

        const submitButton = screen.getByRole("button");
        expect(submitButton).toBeInTheDocument();

        const ageInput = screen.getByPlaceholderText<HTMLInputElement>("e.g. 3");
        expect(ageInput).toBeInTheDocument();

        await userEvent.type(ageInput, "12");
        await userEvent.click(submitButton);
        expect(await screen.queryByText("Age is expressed in months and must be >= 1 and &lt;= 360!")).not.toBeInTheDocument;
      });
    });

    describe("color select", () => {
      it("display error message when color is not selected", async () => {
        renderAddEditCatView();

        const submitButton = screen.getByRole("button");
        expect(submitButton).toBeInTheDocument();

        const colorSelect = screen.getByText("Select an Option");
        expect(colorSelect).toBeInTheDocument();

        await userEvent.click(submitButton);
        expect(await screen.queryByText("Color must be selected!")).toBeInTheDocument();
      });

      it("do not display error message when color is selected", async () => {
        renderAddEditCatView();

        const submitButton = screen.getByRole("button");
        expect(submitButton).toBeInTheDocument();

        const colorSelect = await screen.findByTestId<HTMLSelectElement>("colorSelector");
        expect(colorSelect).toBeInTheDocument();

        await userEvent.selectOptions(colorSelect, "gray");
        expect(await screen.queryByText("Color must be selected!")).not.toBeInTheDocument();
      });
    });

    describe("URL input", () => {
      it("display error message when URL input is empty", async () => {
        renderAddEditCatView();

        const submitButton = screen.getByRole("button");
        expect(submitButton).toBeInTheDocument();

        const urlInput = screen.getByPlaceholderText<HTMLInputElement>("e.g. https//cat-picture-url");
        expect(urlInput).toBeInTheDocument();

        await userEvent.type(urlInput, " ");
        await userEvent.click(submitButton);
        expect(await screen.queryByText("Picture URL must be entered!")).toBeInTheDocument();
      });

      it("display error message when URL input is not valid", async () => {
        renderAddEditCatView();

        const submitButton = screen.getByRole("button");
        expect(submitButton).toBeInTheDocument();

        const urlInput = screen.getByPlaceholderText<HTMLInputElement>("e.g. https//cat-picture-url");
        expect(urlInput).toBeInTheDocument();

        await userEvent.click(submitButton);
        await userEvent.type(urlInput, "not valid URL");
        expect(urlInput).toHaveValue("not valid URL");
        expect(await screen.queryByText("URL is not valid!")).toBeInTheDocument();
      });

      it("do not display error messages when URL input is valid", async () => {
        renderAddEditCatView();

        const submitButton = screen.getByRole("button");
        expect(submitButton).toBeInTheDocument();

        const urlInput = screen.getByPlaceholderText<HTMLInputElement>("e.g. https//cat-picture-url");
        expect(urlInput).toBeInTheDocument();

        await userEvent.type(urlInput, "https://images.pexels.com/photos/774731/pexels-photo-774731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
        await userEvent.click(submitButton);
        expect(await screen.queryByText("URL is not valid!")).not.toBeInTheDocument();
        expect(await screen.queryByText("Picture URL must be entered!")).not.toBeInTheDocument();
      });
    });
  });
});
