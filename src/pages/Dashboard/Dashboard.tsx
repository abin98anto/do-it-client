import React, { useState, useEffect } from "react";
import Header from "./Header";
import TaskGraph from "./TaskGraph";
import TaskList from "./TaskList";
import "./Dashboard.scss";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: "pending" | "completed" | "deleted";
}

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check if screen is mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Clean up
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // Mock fetch tasks - replace with actual API call
  useEffect(() => {
    // Simulating API call to fetch tasks
    setTimeout(() => {
      const mockTasks: Task[] = [
        {
          id: "1",
          title: "Complete project documentation",
          description: "Finish all sections of the documentation",
          dueDate: new Date(2025, 4, 22), // Future date
          status: "pending",
        },
        {
          id: "2",
          title: "Prepare presentation",
          description: "Create slides for the client meeting",
          dueDate: new Date(2025, 4, 18), // Past date
          status: "pending",
        },
        {
          id: "3",
          title: "Code review",
          description: "Review pull requests from team members",
          dueDate: new Date(2025, 4, 25), // Future date
          status: "pending",
        },
        {
          id: "4",
          title: "Update dependencies",
          description: "Update all npm packages to latest versions",
          dueDate: new Date(2025, 4, 15), // Past date
          status: "pending",
        },
        {
          id: "5",
          title: "Deleted task",
          description: "This should not appear",
          dueDate: new Date(2025, 4, 20),
          status: "deleted",
        },
        {
          id: "6",
          title: "Deploy to production",
          description: "Release the new version",
          dueDate: new Date(2025, 4, 30),
          status: "completed",
        },
      ];
      setTasks(mockTasks);
      setLoading(false);
    }, 1000);
  }, []);

  // Calculate stats for the graph
  const completedTasksCount = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const pendingTasksCount = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  // Filter out deleted tasks and get only pending tasks
  const pendingTasks = tasks.filter((task) => task.status === "pending");

  const handleAddNewTask = () => {
    // Handle adding a new task
    console.log("Adding new task");
    // This would open a modal or navigate to a new task form
  };

  return (
    <div className="dashboard">
      <Header />

      <div className={`dashboard-content ${isMobile ? "mobile" : ""}`}>
        {/* Desktop layout: sidebar and main content side by side */}
        {/* Mobile layout: main content first, then sidebar underneath */}

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
    </div>
  );
};

export default Dashboard;
