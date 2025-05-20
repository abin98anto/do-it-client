import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import Header from "./Header";
import TaskGraph from "./TaskGraph";
import TaskList from "./TaskList";
import TaskModal from "./TaskModal";
import { useTasks } from "../../hooks/useTasks";
import { useSocket } from "../../hooks/useSocket";
import "./Dashboard.scss";
import type ITask from "../../entitites/ITask";

const Dashboard: React.FC = () => {
  const { userInfo } = useAppSelector((state) => state.user);
  const { tasks, loading, error, addTask } = useTasks(userInfo?._id as string);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useSocket();

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

  const handleSaveTask = async (
    newTask: Omit<ITask, "_id" | "createdAt" | "updatedAt">
  ) => {
    await addTask({ ...newTask, userId: userInfo?._id as string });
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
          ) : error ? (
            <div className="error">Error: {error}</div>
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
