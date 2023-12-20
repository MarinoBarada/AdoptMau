import axios from "axios";

const adoptCat = async (id: number,) => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/cats/${id}`;
  try {
    await axios.patch(url, { adopted: true, });
    return true; // Adopted successful
  } catch (error) {
    console.error("Error while adopting cat:", error);
    return false; // Adopted failed
  }
};

export default adoptCat;
