import { render, screen } from "@testing-library/vue";

import ModalCat from "@/components/Modals/ModalCat.vue";

describe("ModalCat", () => {
  const renderModalCat = (config = {}) => {
    render(ModalCat, {
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
        showModal: false
      },
      ...config
    });
  };

  it("not displays modal when showModal is false", () => {
    const props = {
      catInfo: {
        name: "Fluffy",
        age: 3,
        color: "gray",
        picture: "https://images.pexels.com/photos/1438649/pexels-photo-1438649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      showModal: false
    };
    const config = { props };
    renderModalCat(config);

    const cardModal = screen.queryByRole("modal");
    expect(cardModal).not.toBeInTheDocument();
  });

  it("displays modal when showModal is true", () => {
    const props = {
      catInfo: {
        name: "Fluffy",
        age: 3,
        color: "gray",
        picture: "https://images.pexels.com/photos/1438649/pexels-photo-1438649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      showModal: true
    };
    const config = { props };
    renderModalCat(config);

    const cardModal = screen.queryByRole("modal");
    expect(cardModal).toBeInTheDocument();
  });

});