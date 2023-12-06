import type { Mock } from "vitest";
import axios from "axios";

import createNewCat from "@/api/createNewCat"

vi.mock("axios");
const axiosPostMock = axios.post as Mock;

describe("createNewCat", () => {
  beforeEach(() => {
    axiosPostMock.mockRejectedValue;
  });

  it("create new cat by calling createNewCat with cat data", async () => {
    const cat = {
      id: 1,
      name: "Fluffy The III",
      age: 3,
      color: "black",
      picture: "https://cat-url",
      adopted: false,
    };

    await createNewCat(cat);
    expect(axios.post).toHaveBeenCalledWith("http://myfakeapi.com/cats", cat);
  });
});