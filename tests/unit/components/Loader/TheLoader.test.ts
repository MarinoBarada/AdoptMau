import { render, screen } from "@testing-library/vue";
import { afterEach } from "vitest";
import { useRouter } from "vue-router";
import type { Mock } from "vitest";

import TheLoader from "@/components/Loader/TheLoader.vue";

vi.mock("vue-router");
const useRouterMock = useRouter as Mock;

describe("TheLoader", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const renderTheLoader = (config = {}) => {
    useRouterMock.mockReturnValue({ push: vi.fn() });

    render(TheLoader, {
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      },
      props: {
        message: "Successful!",
        destination: "home"
      },
      ...config
    });
  };

  it("display loader then message after setTimeout", () => {
    const mock = vi.fn();
    vi.stubGlobal("setTimeout", mock);
    const props = {
      message: "Successful!",
      destination: "home"
    };
    const config = { props };
    renderTheLoader(config);

    expect(mock).toHaveBeenCalled();
  });

  it("display loader then message after 3s", () => {
    const props = {
      message: "Successful!",
      destination: "home"
    };
    const config = { props };
    renderTheLoader(config);

    expect(screen.getByTestId("loader")).toBeInTheDocument();

    vi.advanceTimersByTime(3000);
    expect(screen.getByText("Successful!")).toBeInTheDocument();
  });
});