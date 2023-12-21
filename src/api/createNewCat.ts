import axios from "axios";
import type { Cat } from "@/api/types";

const createNewCat = async (cat: Partial<Cat>) => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/cats`;
  try {
    await axios.post(url, cat);
    return true; // Create successful
  } catch (error) {
    console.error("Error while creating cat:", error);
    return false; // Create failed
  }
};

export default createNewCat;
