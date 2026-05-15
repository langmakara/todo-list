import { useMutation, useQuery, useQueryClient } from "react-query";
import { addTodo, deleteTodo, getAllTodo, updateTodo } from "../api/todo";



const GET_TODO = "GET_TODO";


export const useInvalidateTodo = () => {
    const queryClient = useQueryClient();
    return () => queryClient.invalidateQueries(GET_TODO);
}

export const useGetTodo = ({ payload, config }) => {
    return useQuery({
        queryKey: [GET_TODO, payload],
        queryFn: () => getAllTodo(payload),
        ...config,
    });
}

export const useUpdateTodo = ({ config }) => {
    return useMutation({
        mutationFn: ({ id, data }) => updateTodo({ id, data }),
        ...config,
    });
}


export const useAddTodo = ({ config }) => {
    return useMutation({
        mutationFn: (data) => addTodo(data),
        ...config,
    });
}

export const useDeleteTodo = ({ config }) => {
    return useMutation({
        mutationFn: (id) => deleteTodo(id),
        ...config,
    });
}

    
