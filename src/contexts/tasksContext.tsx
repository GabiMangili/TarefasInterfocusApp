import { createContext, useContext } from "react";
import { Task, User } from "../types";

interface TasksContextType {
    // Define the properties and methods you want to expose in the context
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
    addTask: (task: Task) => void;
    removeTask: (taskId: number) => void;
    updateTask: (taskId: number, updatedTask: Task) => void;
    removeAnyTasks: (tasks: number[]) => void;
}

export const TasksContext = createContext<TasksContextType>({} as TasksContextType);
export const useTasks = () => useContext(TasksContext);
