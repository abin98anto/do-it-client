"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Header from "./Header";
import TaskGraph from "./TaskGraph";
import TaskList from "./TaskList";
import TaskModal from "./TaskModal";
import "./Dashboard.scss";
import type ITask from "../../entitites/ITask";

// interface Task {
//   id: string;
//   title: string;
//   description: string;
//   dueDate: Date;
//   status: "pending" | "completed" | "deleted";
// }

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const mockTasks: ITask[] = [
        // {
        //   id: "1",
        //   title: "Complete project documentation",
        //   description: "Finish all sections of the documentation",
        //   dueDate: new Date(2025, 4, 22),
        //   status: "pending",
        // },
        // {
        //   id: "2",
        //   title: "Prepare presentation",
        //   description: "Create slides for the client meeting",
        //   dueDate: new Date(2025, 4, 18),
        //   status: "pending",
        // },
        // {
        //   id: "3",
        //   title: "Code review",
        //   description: "Review pull requests from team members",
        //   dueDate: new Date(2025, 4, 25),
        //   status: "pending",
        // },
        // {
        //   id: "4",
        //   title: "Update dependencies",
        //   description: "Update all npm packages to latest versions",
        //   dueDate: new Date(2025, 4, 15),
        //   status: "pending",
        // },
        // {
        //   id: "5",
        //   title: "Deleted task",
        //   description: "This should not appear",
        //   dueDate: new Date(2025, 4, 20),
        //   status: "deleted",
        // },
        // {
        //   id: "6",
        //   title: "Deploy to production",
        //   description: "Release the new version",
        //   dueDate: new Date(2025, 4, 30),
        //   status: "completed",
        // },
      ];
      setTasks(mockTasks);
      setLoading(false);
    }, 1000);
  }, []);

  const completedTasksCount = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const pendingTasksCount = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  const pendingTasks = tasks.filter((task) => task.status === "pending");

  const handleAddNewTask = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveTask = (newTask: ITask) => {
    setTasks([...tasks, newTask]);
    setIsModalOpen(false);
  };

  return (
    <div className="dashboard">
      <Header />

      <div className={`dashboard-content ${isMobile ? "mobile" : ""}`}>
        <div className="dashboard-sidebar">
          {!isMobile && (
            <button className="add-task-btn" onClick={handleAddNewTask}>
              + Add New Task
            </button>
          )}

          <div className="graph-container">
            <h2>Task Progress</h2>
            <TaskGraph
              completed={completedTasksCount}
              pending={pendingTasksCount}
            />
          </div>
        </div>

        <div className="dashboard-main">
          <h2>Pending Tasks</h2>
          {loading ? (
            <div className="loading">Loading tasks...</div>
          ) : (
            <TaskList tasks={pendingTasks} />
          )}
        </div>
      </div>

      {isMobile && (
        <button className="add-task-btn-mobile" onClick={handleAddNewTask}>
          +
        </button>
      )}

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
      />
    </div>
  );
};

export default Dashboard;
