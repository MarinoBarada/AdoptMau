import { render, screen } from "@testing-library/vue";

import ModalCatVue from "@/components/Modal/ModalCat.vue";

describe("ModalCatVue", () => {
  const renderModalCatVue = (config = {}) => {
    render(ModalCatVue, {
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
    renderModalCatVue(config);

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
    renderModalCatVue(config);

    const cardModal = screen.queryByRole("modal");
    expect(cardModal).toBeInTheDocument();
  });

});