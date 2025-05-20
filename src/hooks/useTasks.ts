import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import type ITask from "../entitites/ITask";
import { createTask, fetchTasks } from "../api/services/taskService";
import { setTasks } from "../redux/slices/taskSlice";

interface TaskHookResponse {
  tasks: ITask[];
  loading: boolean;
  error: string | null;
  addTask: (task: Omit<ITask, "createdAt" | "updatedAt">) => Promise<void>;
}

export const useTasks = (userId: string): TaskHookResponse => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        if (!userId) return;
        setLoading(true);
        const data = await fetchTasks(userId);
        dispatch(setTasks(data));
      } catch (err) {
        setError("Failed to fetch tasks");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [userId, dispatch]);

  // Add a new task
  const addTask = useCallback(
    async (task: Omit<ITask, "createdAt" | "updatedAt">) => {
      try {
        setLoading(true);
        await createTask(task);
      } catch (err) {
        setError("Failed to create task");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError]
  );

  return { tasks, loading, error, addTask };
};
