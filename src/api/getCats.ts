import axios from "axios";

import type { Cat } from "@/api/types";

const getCats = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/cats`;
  const response = await axios.get<Cat[]>(url);
  return response.data;
};

export default getCats;
