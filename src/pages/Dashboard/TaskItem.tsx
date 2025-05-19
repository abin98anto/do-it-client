import React from "react";
import "./TaskItem.scss";

interface TaskItemProps {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
}

const TaskItem: React.FC<TaskItemProps> = ({ title, description, dueDate }) => {
  const isPastDue = new Date() > dueDate;

  // Format date in a user-friendly way
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className={`task-item ${isPastDue ? "past-due" : ""}`}>
      <div className="task-content">
        <h3 className="task-title">{title}</h3>
        <p className="task-description">{description}</p>
        <div className="task-meta">
          <span className="due-date">
            Due: {formatDate(dueDate)}
            {isPastDue && <span className="overdue-label">OVERDUE</span>}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button className="task-action complete-btn" title="Mark as complete">
          <span className="icon">✓</span>
        </button>
        <button className="task-action edit-btn" title="Edit task">
          <span className="icon">✎</span>
        </button>
        <button className="task-action delete-btn" title="Delete task">
          <span className="icon">×</span>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
