import axios from "axios";

export const getUserById = async (id: string) => {

    try {
        const response = await axios.get(`http://localhost:3001/api/users/${id}`)

        return response.data;
    } catch (error) {
        console.error("Error getting quote.", error);
        throw error;
    }
};
    