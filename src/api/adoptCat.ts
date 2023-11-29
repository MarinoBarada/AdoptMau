import axios from "axios";

const adoptCat = async (id: number) => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/cats/${id}`;
  const response = await axios.patch(url, { adopted: true, });
  return response.data;
};

export default adoptCat;
