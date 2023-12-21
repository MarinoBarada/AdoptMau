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
        destination: "home",
        status: true
      },
      ...config
    });
  };

  it("display loader then message after setTimeout", () => {
    const mock = vi.fn();
    vi.stubGlobal("setTimeout", mock);
    const props = {
      message: "Successful!",
      destination: "home",
      status: true
    };
    const config = { props };
    renderTheLoader(config);

    expect(mock).toHaveBeenCalled();
  });

  it("displays loader then message after 3s when status of CRUD function is successful (true)", async () => {
    const props = {
      message: "Successful!",
      destination: "home",
      status: true
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

  it("displays loader then message after 3s when status of CRUD function is unsuccessful (false)", async () => {
    const props = {
      message: "Unsuccessful!",
      destination: "home",
      status: false
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

    await screen.findByText("Unsuccessful!");

    expect(getByText("Unsuccessful!")).toBeInTheDocument();
  });
});