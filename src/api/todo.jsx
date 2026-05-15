import axios from "axios";


export const getAllTodo = async () => {
    try {
        const response = await axios.get(`https://dummyjson.com/todos`);
        return response.data;
    } catch (error) {
        console.error("Error getting all todos:", error);
        throw error;
    }
}   