import axios from "axios";

export const getSteps = async (routineId: string) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/routines/${routineId}/steps`);
    return response.data;
  } catch (error) {
    console.error("Error getting steps:", error);
  };
};

export const createStep = async (routineId: string, title: string) => {
  try {
    const response = await axios.post(
      `http://localhost:3001/api/routines/${routineId}/steps`,
      { title }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating step:", error);
  }
};
