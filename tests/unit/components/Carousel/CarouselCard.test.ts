import { render, screen } from "@testing-library/vue";

import CarouselCard from "@/components/Carousel/CarouselCard.vue";

describe("CarouselCard", () => {
  const renderCarouselCard = (config = {}) => {
    render(CarouselCard, {
      props: {
        cat: {
          name: "Fluffy",
          age: 3,
          color: "gray",
          adopted: false,
          picture: "https://images.pexels.com/photos/1438649/pexels-photo-1438649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        blurred: true
      },
      ...config
    });
  };

  it("displays name of a cat", () => {
    const props = {
      cat: {
        name: "Fluffy",
        age: 3,
        color: "gray",
        adopted: false,
        picture: "https://images.pexels.com/photos/1438649/pexels-photo-1438649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      blurred: false
    };
    const config = { props };
    renderCarouselCard(config);

    const catName = screen.getByText("Fluffy");
    expect(catName).toBeInTheDocument();
  });
});