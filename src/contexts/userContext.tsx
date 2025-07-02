import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { Task, User } from "../types";

interface UserContextType {
    user: User | undefined;
    setUser: Dispatch<SetStateAction<User | undefined>>;
}

export const UserContext = createContext<UserContextType>({} as UserContextType);
export const useUser = () => useContext(UserContext);
