import type { Mock } from "vitest";
import axios from "axios";

import editCat from "@/api/editCat";

vi.mock("axios");
const axiosPutMock = axios.put as Mock;

describe("deleteCat", () => {
  beforeEach(() => {
    axiosPutMock.mockRejectedValue;
  });

  it.only("delete a cat by delivering a id of a cat we wont to delete", async () => {
    const cat = {
      id: 1,
      name: "Fluffy The III",
      age: 3,
      color: "black",
      picture: "https://cat-url",
      adopted: false,
    };
    await editCat(1, cat);
    expect(axios.put).toHaveBeenCalledWith("http://myfakeapi.com/cats/1", cat);
  });
});