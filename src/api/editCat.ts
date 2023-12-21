import axios from "axios";
import type { Cat } from "@/api/types";

const editCat = async (id: number, cat: Partial<Cat>) => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/cats/${id}`;
  try {
    await axios.put(url, cat);
    return true; // Edit successful
  } catch (error) {
    console.error("Error while editing cat:", error);
    return false; // Edit failed
  }
};

export default editCat;
