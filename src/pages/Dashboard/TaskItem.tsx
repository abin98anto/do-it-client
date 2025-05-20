import React from "react";
import "./TaskItem.scss";
import { updateTask, deleteTask } from "../../api/services/taskService";

interface TaskItemProps {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  description,
  dueDate,
}) => {
  const due = new Date(dueDate);
  const isPastDue = new Date() > due;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleComplete = async () => {
    try {
      await updateTask(id, { status: "completed" });
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(id);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className={`task-item ${isPastDue ? "past-due" : ""}`}>
      <div className="task-content">
        <h3 className={`task-title ${isPastDue ? "past-due-title" : ""}`}>
          {title}
        </h3>
        <p className={`task-description  ${isPastDue ? "past-due-desc" : ""}`}>
          {description}
        </p>
        <div className="task-meta">
          <span className="due-date">
            Due: {formatDate(due)}
            {isPastDue && <span className="overdue-label">OVERDUE</span>}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button
          className="task-action complete-btn"
          title="Mark as complete"
          onClick={handleComplete}
        >
          <span className="icon">✓</span>
        </button>
        <button className="task-action edit-btn" title="Edit task">
          <span className="icon">✎</span>
        </button>
        <button
          className="task-action delete-btn"
          title="Delete task"
          onClick={handleDelete}
        >
          <span className="icon">×</span>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
