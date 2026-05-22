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
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => updateTodo({ id, data }),
        onSuccess: (updatedTodo, variables) => {
            queryClient.setQueryData([GET_TODO, undefined], (oldData) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    todos: oldData.todos.map((t) =>
                        t.id === variables.id ? { ...t, ...variables.data, ...updatedTodo } : t
                    ),
                };
            });
            if (config?.onSuccess) {
                config.onSuccess(updatedTodo, variables);
            }
        },
        onError: (err, variables, context) => {
            if (config?.onError) {
                config.onError(err, variables, context);
            }
        }
    });
}

export const useAddTodo = ({ config }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => addTodo(data),
        onSuccess: (newTodo, variables) => {
            queryClient.setQueryData([GET_TODO, undefined], (oldData) => {
                const addedTodo = { ...variables, ...newTodo };
                if (!oldData) return { todos: [addedTodo] };
                // Ensure unique ID since DummyJSON mock API returns 255 for all new items
                const nextId = oldData.todos.length > 0 ? Math.max(...oldData.todos.map(t => t.id)) + 1 : 1;
                const todoWithUniqueId = { ...addedTodo, id: nextId };
                return {
                    ...oldData,
                    todos: [todoWithUniqueId, ...oldData.todos],
                };
            });
            if (config?.onSuccess) {
                config.onSuccess(newTodo, variables);
            }
        },
        onError: (err, variables, context) => {
            if (config?.onError) {
                config.onError(err, variables, context);
            }
        }
    });
}

export const useDeleteTodo = ({ config }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => deleteTodo(id),
        onSuccess: (deletedData, id) => {
            queryClient.setQueryData([GET_TODO, undefined], (oldData) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    todos: oldData.todos.filter((t) => t.id !== id),
                };
            });
            if (config?.onSuccess) {
                config.onSuccess(deletedData, id);
            }
        },
        onError: (err, id, context) => {
            if (config?.onError) {
                config.onError(err, id, context);
            }
        }
    });
}
