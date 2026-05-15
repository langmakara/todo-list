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

export const updateTodo = async ({ id, data }) => {
    try {
        const response = await axios.put(`https://dummyjson.com/todos/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating todo:", error);
        throw error;
    }
}

export const addTodo = async (data) => {
    try {
        const response = await axios.post(`https://dummyjson.com/todos/add`, data);
        return response.data;
    } catch (error) {
        console.error("Error adding todo:", error);
        throw error;
    }
}

export const deleteTodo = async (id) => {
    try {
        const response = await axios.delete(`https://dummyjson.com/todos/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting todo:", error);
        throw error;
    }
}
