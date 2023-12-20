import { render, screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";

import ModalCat from "@/components/Modals/ModalCat.vue";
import { useUserStore } from "@/stores/user";

describe("ModalCat", () => {
  const renderModalCat = (config = {}) => {
    const pinia = createTestingPinia();
    render(ModalCat, {
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
        }
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
        }
      };
      const config = { props };
      renderModalCat(config);

      const cardModal = screen.queryByTestId("modal");
      expect(cardModal).toBeInTheDocument();
    });

    it("render button for adoption", async () => {
      const props = {
        catInfo: {
          name: "Fluffy",
          age: 3,
          color: "gray",
          picture: "https://images.pexels.com/photos/1438649/pexels-photo-1438649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
      };
      const config = { props };
      renderModalCat(config);
      const userStore = useUserStore();
      userStore.adminIsLogin = false;

      const adoptButton = await screen.queryByRole("button", { name: /adopt/i });
      expect(adoptButton).toBeInTheDocument();
    });

    describe("when admin is login", () => {
      it("do not render button for adoption", async () => {
        const props = {
          catInfo: {
            name: "Fluffy",
            age: 3,
            color: "gray",
            picture: "https://images.pexels.com/photos/1438649/pexels-photo-1438649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
        };
        const config = { props };
        renderModalCat(config);
        const userStore = useUserStore();
        userStore.adminIsLogin = true;

        const adoptButton = await screen.queryByRole("button", { name: /adopt/i });
        expect(adoptButton).not.toBeInTheDocument();
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
        }
      };
      const config = { props };
      renderModalCat(config);

      const cardModal = await screen.queryByRole("modal");
      expect(cardModal).not.toBeInTheDocument();
    });
  });
});