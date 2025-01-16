import axios from "axios";

export const getQuote = async () => {
  try {
    const response = await axios.get("http://localhost:3001/api/quotes");

    return response.data;
  } catch (error) {
    console.error("Error getting quote.", error);
    throw error;
  }
};
