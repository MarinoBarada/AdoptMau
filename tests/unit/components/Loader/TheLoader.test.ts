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
    vi.runOnlyPendingTimers();
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

  it("displays loader then message after 3s", async () => {
    const props = {
      message: "Successful!",
      destination: "home"
    };
    const { getByTestId, getByText } = render(TheLoader, {
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      },
      props
    });

    expect(getByTestId("loader")).toBeInTheDocument();

    vi.advanceTimersByTime(3000);

    await screen.findByText("Successful!");

    expect(getByText("Successful!")).toBeInTheDocument();
  });
});