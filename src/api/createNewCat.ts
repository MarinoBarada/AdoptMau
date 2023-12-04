import axios from "axios";
import type { Cat } from "@/api/types";

const createNewCat = async (cat: Partial<Cat>) => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/cats`;
  await axios.post(url, cat);
};

export default createNewCat;
