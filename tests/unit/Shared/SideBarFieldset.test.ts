import { render, screen } from "@testing-library/vue";

import SideBarFieldset from "@/components/Shared/SideBarFieldset.vue";

describe("SideBarFieldset", () => {
  const renderSideBarFieldset = (config = {}) => {
    render(SideBarFieldset, {
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      },
      props: {
        header: "My Sort By"
      },
      slots: {
        default: "<h3>My nested child</h3>"
      },
      ...config
    });
  };

  it("renders child content", async () => {
    const props = {
      header: "My Sort By"
    };
    const slots = {
      default: "<h3>My nested child</h3>"
    };
    const config = { props, slots };

    renderSideBarFieldset(config);

    expect(screen.getByText("My nested child")).toBeInTheDocument();
  });

  describe("when parent does not provide custom child content", () => {
    it("renders default content", async () => {
      const props = {
        header: "My Sort By"
      };
      const slots = {};
      const config = { props, slots };

      renderSideBarFieldset(config);

      expect(
        screen.getByText("Whoops, somebody forgot to populate me!")
      ).toBeInTheDocument();
    });
  });
});