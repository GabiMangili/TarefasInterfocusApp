import { useEffect, useRef, useState } from "react";
import { Task, TaskStatus } from "../types";
import { TasksContext } from "../contexts/tasksContext";
import { MMKV } from "react-native-mmkv";
import { StorageService } from "../controllers/mmkvController";
import { useUser } from "../contexts/userContext";

export default function TasksProvider({ children }: any) {
  const { user } = useUser();
  const [loaded, setLoaded] = useState(false);
  const tasks = useRef<Task[]>([]);
  const [_, rerender] = useState(0);

  const getStorage = (): MMKV | undefined => {
    if (user) {
      return StorageService.storage(user.usuarioId.toString());
    }
  };

  

  const saveTasksToStorage = async (updatedTasks: Task[]) => {
    const storage = getStorage();
    if (storage) {
      StorageService.saveData(storage, "tasks", JSON.stringify(updatedTasks));
    }
  };

  const loadTasksFromStorage = async () => {
    const storage = getStorage();
    if (storage) {
      const stored = await StorageService.getData(storage, "tasks");
      if (stored) {
        try {
          const parsed: Task[] = JSON.parse(stored);
          tasks.current = parsed;
        } catch (e) {
          console.error("Erro ao carregar tasks do storage:", e);
        }
      } else {
        // Nenhuma task salva — pode usar lista padrão se quiser
        tasks.current = Array.from({ length: 50 }, (_, i) => ({
          id: i + 1,
          title: `Task ${i + 1}`,
          description: `Description for task ${i + 1}`,
          status: Math.random() > 0.5 ? TaskStatus.Pending : TaskStatus.Concluded,
          date: new Date().toISOString(),
        }));
        saveTasksToStorage(tasks.current);
      }
      setLoaded(true);
    }
  };

  useEffect(() => {
    loadTasksFromStorage();
  }, [user]);

  const setTasks = (newTasks: Task[]) => {
    tasks.current = newTasks;
    saveTasksToStorage(newTasks);
  };

  const addTask = (task: Task) => {
    const newTask = {
      ...task,
      id: tasks.current.length + 1,
      date: new Date().toISOString()
    } as Task;
    const updated = [...tasks.current, newTask];
    tasks.current = updated;
    saveTasksToStorage(updated);
    rerender(prev => prev + 1);
  };

  const removeTask = (taskId: number) => {
    const updated = tasks.current.filter((task) => task.id !== taskId);
    tasks.current = updated;
    saveTasksToStorage(updated);
  };

  const removeAnyTasks = (taskIds: number[]) => {
    const updated = tasks.current.filter((task) => !taskIds.includes(task.id));
    tasks.current = updated;
    saveTasksToStorage(updated);
    rerender(prev => prev + 1);
  };


  const updateTask = (taskId: number, updatedTask: Task) => {
    const updated = tasks.current.map((task) =>
      task.id === taskId ? { ...task, ...updatedTask } : task
    );
    tasks.current = updated;
    saveTasksToStorage(updated);
    rerender(prev => prev + 1);
  };

  if (!loaded) return null; // ou um spinner se preferir

  return (
    <TasksContext.Provider
      value={{
        tasks: tasks.current,
        setTasks,
        addTask,
        removeTask,
        updateTask,
        removeAnyTasks
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
