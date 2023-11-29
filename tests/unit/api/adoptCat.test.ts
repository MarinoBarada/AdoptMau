import type { Mock } from "vitest";
import axios from "axios";

import adoptCat from "@/api/adoptCat";

vi.mock("axios");
const axiosPatchMock = axios.patch as Mock;

describe("adoptCat", () => {
  beforeEach(() => {
    axiosPatchMock.mockResolvedValue({
      data: [
        {
          id: 1,
          name: "Fluffy",
          adopted: false,
        }
      ]
    });
  });

  it("patch cat adopt from false to true of cat with id we sent", async () => {
    await adoptCat(1);
    expect(axios.patch).toHaveBeenCalledWith("http://myfakeapi.com/cats/1", { adopted: true, });
  });
});