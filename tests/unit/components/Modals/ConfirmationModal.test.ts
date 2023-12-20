import { render, screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import userEvent from "@testing-library/user-event";

import ConfirmationModal from "@/components/Modals/ConfirmationModal.vue";

describe("ConfirmationModal", () => {
  const renderConfirmationModal = (config = {}) => {
    const pinia = createTestingPinia();
    render(ConfirmationModal, {
      global: {
        stubs: {
          FontAwesomeIcon: true
        },
        plugins: [pinia],
      },
      props: {
        catInfo: {
          id: 1,
          name: "Fluffy",
          age: 3,
          color: "gray",
          picture: "https://images.pexels.com/photos/1438649/pexels-photo-1438649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        modalType: "adopt"
      },
      ...config
    });
  };

  describe("AdoptDeleteModal", () => {
    it("displays adopt modal style", () => {
      const props = {
        catInfo: {
          id: 1,
          name: "Fluffy",
          age: 3,
          color: "gray",
          picture: "https://images.pexels.com/photos/1438649/pexels-photo-1438649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        modalType: "adopt"
      };
      const config = { props };
      renderConfirmationModal(config);
      expect(screen.findByAltText("Are you sure you want to adopt this cat?"));
      expect(screen.findByAltText("Yes, adopt!"));
    });

    it("displays delete modal style", () => {
      const props = {
        catInfo: {
          id: 1,
          name: "Fluffy",
          age: 3,
          color: "gray",
          picture: "https://images.pexels.com/photos/1438649/pexels-photo-1438649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        modalType: "delete"
      };
      const config = { props };
      renderConfirmationModal(config);
      expect(screen.findByAltText("Are you sure you want to delete this cat?"));
      expect(screen.findByAltText("Yes, delete!"));
    });
  });

  describe("StatusModal", () => {
    it("display failed adoption modal when click YES button", async () => {
      const props = {
        catInfo: {
          id: 1,
          name: "Fluffy",
          age: 3,
          color: "gray",
          picture: "https://images.pexels.com/photos/1438649/pexels-photo-1438649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        modalType: "adopt"
      };
      const config = { props };
      renderConfirmationModal(config);
      const yesButton = screen.getByRole("button", { name: /yes, adopt!/i });
      expect(yesButton).toBeInTheDocument();
      await userEvent.click(yesButton);
      expect(await screen.queryByText("Adoption unsuccessful")).toBeInTheDocument();
    });

    it("display failed delete modal when click YES button", async () => {
      const props = {
        catInfo: {
          id: 1,
          name: "Fluffy",
          age: 3,
          color: "gray",
          picture: "https://images.pexels.com/photos/1438649/pexels-photo-1438649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        modalType: "delete"
      };
      const config = { props };
      renderConfirmationModal(config);
      const deleteButton = screen.getByRole("button", { name: /yes, delete!/i });
      expect(deleteButton).toBeInTheDocument();
      await userEvent.click(deleteButton);
      expect(await screen.queryByText("Delete unsuccessful")).toBeInTheDocument();
    });
  });
});