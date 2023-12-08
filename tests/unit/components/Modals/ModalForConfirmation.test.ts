import { screen } from "@testing-library/vue";
import { shallowMount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";

import ModalForConfirmation from "@/components/Modals/ModalForConfirmation.vue";

describe("ModalForConfirmation", () => {
  const renderModalForConfirmation = (config = {}) => {
    setActivePinia(createPinia());
    return shallowMount(ModalForConfirmation, {
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
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

      const ModalForConfirmation = screen.queryByRole("modal");
      expect(ModalForConfirmation).toBeInTheDocument;
    });

    describe("when adopted modal design is visible", () => {
      describe("exclamation modal (confirmation is false)", () => {
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
          const wrapper = renderModalForConfirmation(config);
          /// @ts-expect-error
          wrapper.vm.confirmation = false;
          expect(screen.findByText("Are you sure you want to adopt this cat?")).toBeInTheDocument;
          expect(screen.findByText("You won't be able to return this cutie!")).toBeInTheDocument;
          const yesButton = screen.findByRole("button", { name: /yes, adopt!/i });
          expect(yesButton).toBeInTheDocument;
          const cancelButton = screen.findByRole("button", { name: /cancel/i });
          expect(cancelButton).toBeInTheDocument;
        });
      });
      describe("confirmation modal (confirmation is true)", () => {
        it("renders header, paragraph and OK button", () => {
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
          const wrapper = renderModalForConfirmation(config);
          /// @ts-expect-error
          wrapper.vm.confirmation = true;
          expect(screen.findByText("Adoption successful")).toBeInTheDocument;
          expect(screen.findByText("Fluffy was adopted.")).toBeInTheDocument;
          const okButton = screen.findByRole("button", { name: /ok/i });
          expect(okButton).toBeInTheDocument;
        });
      });
    });

    describe("when delete modal design is visible", () => {
      describe("exclamation modal (confirmation is false)", () => {
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
          const wrapper = renderModalForConfirmation(config);
          /// @ts-expect-error
          wrapper.vm.confirmation = false;
          expect(screen.findByText("Are you sure you want to delete this cat?")).toBeInTheDocument;
          expect(screen.findByText("You won't be able to return this cutie!")).toBeInTheDocument;
          const deleteButton = screen.findByRole("button", { name: /yes, delete!/i });
          expect(deleteButton).toBeInTheDocument;
          const cancelButton = screen.findByRole("button", { name: /cancel/i });
          expect(cancelButton).toBeInTheDocument;
        });
      });
      describe("confirmation modal (confirmation is true)", () => {
        it("renders header, paragraph and OK button", () => {
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
          const wrapper = renderModalForConfirmation(config);
          /// @ts-expect-error
          wrapper.vm.confirmation = true;
          expect(screen.findByText("Delete successful")).toBeInTheDocument;
          expect(screen.findByText("Fluffy was deleted.")).toBeInTheDocument;
          const okButton = screen.findByRole("button", { name: /ok/i });
          expect(okButton).toBeInTheDocument;
        });
      });
    });
  });
});