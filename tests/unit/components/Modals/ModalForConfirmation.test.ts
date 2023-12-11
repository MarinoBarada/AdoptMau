import { screen, render } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";

import ModalForConfirmation from "@/components/Modals/ModalForConfirmation.vue";

describe("ModalForConfirmation", () => {
  const renderModalForConfirmation = (config = {}) => {
    const pinia = createTestingPinia();
    render(ModalForConfirmation, {
      global: {
        stubs: {
          FontAwesomeIcon: true
        },
        plugins: [pinia],
      },
      props: {
        catInfo: {
          name: "Fluffy",
          age: 3,
          color: "gray",
          picture: "https://images.pexels.com/photos/1438649/pexels-photo-1438649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        showModal: false,
        allModals: false,
        modalType: "adopted"
      },
      ...config
    });
  };

  describe("when showModal is true", () => {
    it("displays modal", () => {
      const props = {
        catInfo: {
          name: "Fluffy",
          age: 3,
          color: "gray",
          picture: "https://images.pexels.com/photos/1438649/pexels-photo-1438649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        showModal: true,
        allModals: false,
        modalType: "adopted"
      };
      const config = { props };
      renderModalForConfirmation(config);

      const confirmationModal = screen.queryByRole("modal");
      expect(confirmationModal).toBeInTheDocument();
    });

    describe("when adopted modal design is visible", () => {
      it("renders header, paragraph and yes and cancel button", () => {
        const props = {
          catInfo: {
            name: "Fluffy",
            age: 3,
            color: "gray",
            picture: "https://images.pexels.com/photos/1438649/pexels-photo-1438649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          },
          showModal: true,
          allModals: false,
          modalType: "adopted"
        };
        const config = { props };
        renderModalForConfirmation(config);

        const confirmationModal = screen.queryByRole("modal");
        expect(confirmationModal).toBeInTheDocument();

        expect(screen.queryByText("Are you sure you want to adopt this cat?")).toBeInTheDocument();
        expect(screen.queryByText("You won't be able to return this cutie!")).toBeInTheDocument();
        const yesButton = screen.queryByRole("button", { name: /yes, adopt!/i });
        expect(yesButton).toBeInTheDocument();
        const cancelButton = screen.queryByRole("button", { name: /cancel/i });
        expect(cancelButton).toBeInTheDocument();
      });
    });

    describe("when delete modal design is visible", () => {
      it("renders header, paragraph and delete and cancel button", () => {
        const props = {
          catInfo: {
            name: "Fluffy",
            age: 3,
            color: "gray",
            picture: "https://images.pexels.com/photos/1438649/pexels-photo-1438649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          },
          showModal: true,
          allModals: false,
          modalType: "delete"
        };
        const config = { props };
        renderModalForConfirmation(config);

        const confirmationModal = screen.queryByRole("modal");
        expect(confirmationModal).toBeInTheDocument();

        expect(screen.queryByText("Are you sure you want to delete this cat?")).toBeInTheDocument();
        expect(screen.queryByText("You won't be able to return this cutie!")).toBeInTheDocument();
        const deleteButton = screen.queryByRole("button", { name: /yes, delete!/i });
        expect(deleteButton).toBeInTheDocument();
        const cancelButton = screen.queryByRole("button", { name: /cancel/i });
        expect(cancelButton).toBeInTheDocument();
      });
    });
  });

  describe("when showModal is false", () => {
    it("not displays modal", async () => {
      const props = {
        catInfo: {
          name: "Fluffy",
          age: 3,
          color: "gray",
          picture: "https://images.pexels.com/photos/1438649/pexels-photo-1438649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        showModal: false,
        allModals: false,
        modalType: "adopt"
      };
      const config = { props };
      renderModalForConfirmation(config);

      const confirmationModal = screen.queryByRole("modal");
      expect(confirmationModal).not.toBeInTheDocument();
    });
  });
});