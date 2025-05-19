const TaskStatus = {
  PENDING: "pending",
  COMPLETED: "completed",
  DELETED: "deleted",
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
