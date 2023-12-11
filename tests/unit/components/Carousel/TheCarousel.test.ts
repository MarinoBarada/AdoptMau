import { shallowMount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";

import TheCarousel from "@/components/Carousel/TheCarousel.vue";

describe("TheCarousel", () => {
  let wrapper: any;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = shallowMount(TheCarousel, {
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
  });

  it("increases activeIndex and set direction to right when click on right arrow and activate function rightButton", async () => {
    wrapper.vm.activeIndex = 2;
    wrapper.vm.direction = "left";
    wrapper.vm.rightButton();

    expect(wrapper.vm.activeIndex).toBe(3);
    expect(wrapper.vm.direction).toBe("right");
  });

  it("decreases  activeIndex and set direction to left when click on left arrow and activate function leftButton", async () => {
    wrapper.vm.activeIndex = 2;
    wrapper.vm.direction = "right";
    wrapper.vm.leftButton();

    expect(wrapper.vm.activeIndex).toBe(1);
    expect(wrapper.vm.direction).toBe("left");
  });
});