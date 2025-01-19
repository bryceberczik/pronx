import axios from "axios";

export const getRoutine = async (routineId: string) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/routines/${routineId}`);
        return response.data;
    } catch (error) {
        console.error("Error getting routine: ", error);
    }
}