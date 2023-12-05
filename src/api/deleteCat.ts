import axios from "axios";

const deleteCat = async (id: number) => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/cats/${id}`;
  await axios.delete(url);
};

export default deleteCat;
