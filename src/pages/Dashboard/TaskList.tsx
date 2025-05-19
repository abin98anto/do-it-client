import React from "react";
import TaskItem from "./TaskItem";
import "./TaskList.scss";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: "pending" | "completed" | "deleted";
}

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  if (tasks.length === 0) {
    return (
      <div className="no-tasks">
        <p>No pending tasks! 🎉</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          dueDate={task.dueDate}
        />
      ))}
    </div>
  );
};

export default TaskList;
