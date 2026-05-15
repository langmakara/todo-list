import { loginUser } from "../api/user";
import { useMutation } from "react-query";



export const useLogin = ({ config }) => {
    return useMutation({
        mutationFn: ({ username }) => loginUser(username),
        ...config,
    });
};

    