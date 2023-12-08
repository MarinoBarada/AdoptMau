import { render, screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import userEvent from "@testing-library/user-event";
import { RouterLinkStub } from "@vue/test-utils";

import LoginView from "@/views/LoginView.vue";

vi.mock("vue-router");

describe("LoginView", () => {
  const renderLoginView = () => {
    const pinia = createTestingPinia();

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
        expect(submitButton).toBeInTheDocument;

        const usernameInput = screen.getByPlaceholderText("Username");
        expect(usernameInput).toBeInTheDocument;
        const passwordInput = screen.getByPlaceholderText("Password");
        expect(usernameInput).toBeInTheDocument;

        await userEvent.type(usernameInput, " ");
        await userEvent.type(passwordInput, "a");
        await userEvent.click(submitButton);
        expect(screen.findAllByText("ERROR: Password and Username must be entered!")).toBeInTheDocument;
      });
    });

    describe("when username is correct (is admin) and password is incorrect", () => {
      it("display error message 'Incorrect username or password!'", async () => {
        renderLoginView();

        const submitButton = screen.getByRole("button", { name: /login/i });
        expect(submitButton).toBeInTheDocument;

        const usernameInput = screen.getByPlaceholderText("Username");
        expect(usernameInput).toBeInTheDocument;
        const passwordInput = screen.getByPlaceholderText("Password");
        expect(usernameInput).toBeInTheDocument;

        await userEvent.type(usernameInput, "admin");
        await userEvent.type(passwordInput, "incorrect");
        await userEvent.click(submitButton);
        expect(screen.findAllByText("ERROR: Incorrect username or password!")).toBeInTheDocument;
      });
    });

    describe("when username is incorrect and password is correct (12345)", () => {
      it("display error message 'Incorrect username or password!'", async () => {
        renderLoginView();

        const submitButton = screen.getByRole("button", { name: /login/i });
        expect(submitButton).toBeInTheDocument;

        const usernameInput = screen.getByPlaceholderText("Username");
        expect(usernameInput).toBeInTheDocument;
        const passwordInput = screen.getByPlaceholderText("Password");
        expect(usernameInput).toBeInTheDocument;

        await userEvent.type(usernameInput, "incorrect");
        await userEvent.type(passwordInput, "12345");
        await userEvent.click(submitButton);
        expect(screen.findAllByText("ERROR: Incorrect username or password!")).toBeInTheDocument;
      });
    });

    describe("when username and password is correct", () => {
      it("do not displays any errors messages", async () => {
        renderLoginView();

        const submitButton = screen.getByRole("button", { name: /login/i });
        expect(submitButton).toBeInTheDocument;

        const usernameInput = screen.getByPlaceholderText("Username");
        expect(usernameInput).toBeInTheDocument;
        const passwordInput = screen.getByPlaceholderText("Password");
        expect(usernameInput).toBeInTheDocument;

        await userEvent.click(submitButton);
        await userEvent.type(usernameInput, "admin");
        await userEvent.type(passwordInput, "12345");
        expect(screen.findAllByText("ERROR: Incorrect username or password!")).not.toBeInTheDocument;
        expect(screen.findAllByText("ERROR: Password and Username must be entered!")).not.toBeInTheDocument;
      });
    });
  });
});