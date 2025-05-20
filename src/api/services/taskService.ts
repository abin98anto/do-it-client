import axiosInstance from "../../config/axiosInstance";
import type ITask from "../../entitites/ITask";
import type TaskResponse from "../types/taskTypes";

export const fetchTasks = async (userId: string): Promise<ITask[]> => {
  const response = await axiosInstance.get<TaskResponse>(`/task/${userId}`);
  return Array.isArray(response.data.data) ? response.data.data : [];
};

export const createTask = async (
  task: Omit<ITask, "createdAt" | "updatedAt">
): Promise<ITask> => {
  const response = await axiosInstance.post<TaskResponse>("/task/create", task);
  return response.data.data as ITask;
};

export const updateTask = async (
  id: string,
  task: Partial<ITask>
): Promise<ITask> => {
  const response = await axiosInstance.put<TaskResponse>(`/task/${id}`, task);
  return response.data.data as ITask;
};

export const deleteTask = async (id: string): Promise<void> => {
  await axiosInstance.delete<TaskResponse>(`/task/${id}`);
};
