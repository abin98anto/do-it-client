import type React from "react";
import { useState, useEffect } from "react";
import "./TaskModal.scss";
import { type TaskStatus } from "../../entitites/misc/TaskStatus";
import type ITask from "../../entitites/ITask";
import { useAppSelector } from "../../hooks/reduxHooks";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<ITask, "createdAt" | "updatedAt">) => void;
  task?: ITask | null;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  task,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [status, setStatus] = useState<TaskStatus>("pending");
  const { userInfo } = useAppSelector((state) => state.user);
  const userId = userInfo?._id as string;

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      const date = new Date(task.dueDate);
      setDueDate(date.toISOString().split("T")[0]);
      setStatus(task.status);
    } else {
      setTitle("");
      setDescription("");
      setDueDate(new Date().toISOString().split("T")[0]);
      setStatus("pending");
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !dueDate) return;

    onSave({
      ...(task && { _id: task._id }),
      title,
      userId,
      description,
      dueDate: new Date(dueDate),
      status,
    });
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{task ? "Edit Task" : "Add New Task"}</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description"
              rows={4}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          <div className="modal-footer">
            <button type="submit" className="button button-primary">
              {task ? "Update Task" : "Save Task"}
            </button>
            <button
              type="button"
              className="button button-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
