import type { Mock } from "vitest";
import axios from "axios";

import deleteCat from "@/api/deleteCat";

vi.mock("axios");
const axiosDeleteMock = axios.delete as Mock;

describe("deleteCat", () => {
  beforeEach(() => {
    axiosDeleteMock.mockRejectedValue;
  });

  it("delete a cat by delivering a id of a cat we wont to delete", async () => {
    await deleteCat(1);
    expect(axios.delete).toHaveBeenCalledWith("http://myfakeapi.com/cats/1");
  });
});