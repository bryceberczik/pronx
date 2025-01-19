import axios from "axios";

export const deleteStep = async (routineId: string, stepId: string) => {
    try {
        const response = await axios.delete(`http://localhost:3001/api/routines/${routineId}/steps/${stepId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting step", error);
    }
}