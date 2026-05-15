import { useQuery, useQueryClient } from "react-query";
import { getAllTodo } from "../api/todo";



const GET_TODO = "GET_TODO";

export const useInvalidateEmployee = () => {
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
