import axios from "axios";
import type { Cat } from "@/api/types";

const editCat = async (id: number, cat: Partial<Cat>) => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/cats/${id}`;
  await axios.put(url, cat);
};

export default editCat;
