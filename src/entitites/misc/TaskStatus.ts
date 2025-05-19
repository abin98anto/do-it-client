export const Status = {
  PENDING: "pending",
  COMPLETED: "completed",
  DELETED: "deleted",
} as const;

export type TaskStatus = (typeof Status)[keyof typeof Status];
