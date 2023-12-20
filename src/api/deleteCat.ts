import axios from "axios";

const deleteCat = async (id: number) => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/cats/${id}`;
  try {
    await axios.delete(url);
    return true; // Delete successful
  } catch (error) {
    console.error("Error while deleting a cat:", error);
    return false; // Delete failed
  }
};

export default deleteCat;
