import { useRef } from "react";
import { Task, TaskStatus } from "../types";
import { TasksContext } from "../contexts/tasksContext";

export default function TasksProvider({ children }: any) {
    const newTasks = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        title: `Task ${i + 1}`,
        description: `Description for task ${i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        status: Math.random() > 0.5 ? TaskStatus.Pending : TaskStatus.Concluded, // Randomly set status to 0 or 1
        date: new Date().toISOString(), // Current date in ISO format
    } as Task));
    const tasks = useRef<Task[]>(newTasks);

    function setTasks(newTasks: Task[]) {
        tasks.current = newTasks;
    }

    function addTask(task: Task) {
        tasks.current.push(task);
    }

    function removeTask(taskId: number) {
        tasks.current = tasks.current.filter(task => task.id !== taskId);
    }

    function updateTask(taskId: number, updatedTask: Task) {
        tasks.current = tasks.current.map(task =>
            task.id === taskId ? { ...task, ...updatedTask } : task
        );
    }

    return <TasksContext.Provider value={
        {
            tasks: tasks.current,
            setTasks,
            addTask,
            removeTask,
            updateTask
        }
    }>
        {children}
    </TasksContext.Provider>
}