import axios from "axios";

export const loginUser = async (username) => {
    try {
        const response = await axios.post(`https://dummyjson.com/user/login`, {
            username,
            password: "emilyspass",
            expiresInMins: 1, 
        });
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}