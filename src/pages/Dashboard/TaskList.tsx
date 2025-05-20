import React from "react";
import TaskItem from "./TaskItem";
import "./TaskList.scss";
import type ITask from "../../entitites/ITask";

interface TaskListProps {
  tasks: ITask[];
  onEditTask?: (task: ITask) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEditTask }) => {
  if (tasks.length === 0) {
    return <div className="no-tasks">No tasks available.</div>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          id={task._id as string}
          title={task.title}
          description={task.description || ""}
          dueDate={new Date(task.dueDate)}
          status={task.status}
          onEdit={onEditTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
