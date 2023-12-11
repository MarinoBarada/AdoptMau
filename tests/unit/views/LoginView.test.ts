import { render, screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import userEvent from "@testing-library/user-event";
import { RouterLinkStub } from "@vue/test-utils";
import { useRouter } from "vue-router";
import type { Mock } from "vitest";

import LoginView from "@/views/LoginView.vue";

vi.mock("vue-router");
const useRouterMock = useRouter as Mock;

describe("LoginView", () => {
  const renderLoginView = () => {
    const pinia = createTestingPinia();
    useRouterMock.mockReturnValue({ push: vi.fn() });

    render(LoginView, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub
        },
        plugins: [pinia],
      }
    });
  };

  describe("form validation (start when user click submit form button)", () => {
    describe("when username or password is empty", () => {
      it("display error message 'Password and Username must be entered!'", async () => {
        renderLoginView();

        const submitButton = screen.getByRole("button", { name: /login/i });
        expect(submitButton).toBeInTheDocument();

        const usernameInput = screen.getByPlaceholderText<HTMLInputElement>("Username");
        expect(usernameInput).toBeInTheDocument();
        const passwordInput = screen.getByPlaceholderText<HTMLInputElement>("Password");
        expect(passwordInput).toBeInTheDocument();

        await userEvent.type(usernameInput, " ");
        await userEvent.type(passwordInput, "a");
        expect(usernameInput).toHaveValue("");
        expect(passwordInput).toHaveValue("a");
        await userEvent.click(submitButton);
        expect(await screen.queryByText("ERROR: Password and Username must be entered!")).toBeInTheDocument();
      });
    });

    describe("when username is correct (is admin) and password is incorrect", () => {
      it("display error message 'Incorrect username or password!'", async () => {
        renderLoginView();

        const submitButton = screen.getByRole("button", { name: /login/i });
        expect(submitButton).toBeInTheDocument();

        const usernameInput = screen.getByPlaceholderText<HTMLInputElement>("Username");
        expect(usernameInput).toBeInTheDocument();
        const passwordInput = screen.getByPlaceholderText<HTMLInputElement>("Password");
        expect(passwordInput).toBeInTheDocument();

        await userEvent.type(usernameInput, "admin");
        await userEvent.type(passwordInput, "incorrect");
        expect(usernameInput).toHaveValue("admin");
        expect(passwordInput).toHaveValue("incorrect");
        await userEvent.click(submitButton);
        expect(await screen.queryByText("ERROR: Incorrect username or password!")).toBeInTheDocument();
      });
    });

    describe("when username is incorrect and password is correct (12345)", () => {
      it("display error message 'Incorrect username or password!'", async () => {
        renderLoginView();

        const submitButton = screen.getByRole("button", { name: /login/i });
        expect(submitButton).toBeInTheDocument();

        const usernameInput = screen.getByPlaceholderText<HTMLInputElement>("Username");
        expect(usernameInput).toBeInTheDocument();
        const passwordInput = screen.getByPlaceholderText<HTMLInputElement>("Password");
        expect(passwordInput).toBeInTheDocument();

        await userEvent.type(usernameInput, "incorrect");
        await userEvent.type(passwordInput, "12345");
        expect(usernameInput).toHaveValue("incorrect");
        expect(passwordInput).toHaveValue("12345");
        await userEvent.click(submitButton);
        expect(await screen.queryByText("ERROR: Incorrect username or password!")).toBeInTheDocument();
      });
    });

    describe("when username and password is correct", () => {
      it("do not displays any errors messages", async () => {
        renderLoginView();

        const submitButton = screen.getByRole("button", { name: /login/i });
        expect(submitButton).toBeInTheDocument();

        const usernameInput = screen.getByPlaceholderText<HTMLInputElement>("Username");
        expect(usernameInput).toBeInTheDocument();
        const passwordInput = screen.getByPlaceholderText<HTMLInputElement>("Password");
        expect(passwordInput).toBeInTheDocument();

        await userEvent.type(usernameInput, "admin");
        await userEvent.type(passwordInput, "12345");
        expect(usernameInput).toHaveValue("admin");
        expect(passwordInput).toHaveValue("12345");
        await userEvent.click(submitButton);
        expect(await screen.queryByText("ERROR: Incorrect username or password!")).not.toBeInTheDocument();
        expect(await screen.queryByText("ERROR: Password and Username must be entered!")).not.toBeInTheDocument();
      });
    });
  });
});