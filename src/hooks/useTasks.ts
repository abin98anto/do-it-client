import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import type ITask from "../entitites/ITask";
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from "../api/services/taskService";
import { setTasks } from "../redux/slices/taskSlice";

interface TaskHookResponse {
  tasks: ITask[];
  loading: boolean;
  error: string | null;
  addTask: (task: Omit<ITask, "createdAt" | "updatedAt">) => Promise<void>;
  editTask: (id: string, task: Partial<ITask>) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
}

export const useTasks = (userId: string): TaskHookResponse => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      try {
        const data = await fetchTasks(userId);
        dispatch(setTasks(data));
      } catch (err) {
        setError("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, [userId, dispatch]);

  // Add a new task
  const addTask = useCallback(
    async (task: Omit<ITask, "createdAt" | "updatedAt">) => {
      setLoading(true);
      try {
        const newTask = await createTask(task);
        dispatch(setTasks([...tasks, newTask]));
      } catch (err) {
        setError("Failed to create task");
      } finally {
        setLoading(false);
      }
    },
    [dispatch, tasks]
  );

  // Edit an existing task
  const editTask = useCallback(
    async (id: string, task: Partial<ITask>) => {
      setLoading(true);
      try {
        const updatedTask = await updateTask(id, task);
        dispatch(
          setTasks(
            tasks.map((t: ITask) =>
              t._id === id ? { ...t, ...updatedTask } : t
            )
          )
        );
      } catch (err) {
        setError("Failed to update task");
      } finally {
        setLoading(false);
      }
    },
    [dispatch, tasks]
  );

  // Delete a task
  const removeTask = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        await deleteTask(id);
        dispatch(setTasks(tasks.filter((t: ITask) => t._id !== id)));
      } catch (err) {
        setError("Failed to delete task");
      } finally {
        setLoading(false);
      }
    },
    [dispatch, tasks]
  );

  return { tasks, loading, error, addTask, editTask, removeTask };
};
