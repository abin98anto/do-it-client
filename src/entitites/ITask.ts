import type { TaskStatus } from "./misc/TaskStatus";

export default interface ITask {
  _id?: string;
  userId: string;
  title: string;
  description: string;
  dueDate: Date;
  status: TaskStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
