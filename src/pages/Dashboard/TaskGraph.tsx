import React, { useEffect, useRef } from "react";
import "./TaskGraph.scss";

interface TaskGraphProps {
  completed: number;
  pending: number;
}

const TaskGraph: React.FC<TaskGraphProps> = ({ completed, pending }) => {
  const total = completed + pending;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || total === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    const completedAngle = (completed / total) * 2 * Math.PI;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, 0, completedAngle);
    ctx.fillStyle = "#4caf50";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, completedAngle, 2 * Math.PI);
    ctx.fillStyle = "#ff9800";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();

    const completedPercentage = Math.round((completed / total) * 100);
    const pendingPercentage = 100 - completedPercentage;

    ctx.font = "bold 14px Inter, sans-serif";
    ctx.fillStyle = "#2c3e50";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if (completedPercentage > 0) {
      ctx.fillText(`${completedPercentage}%`, centerX, centerY - 10);
      ctx.font = "10px Inter, sans-serif";
      ctx.fillStyle = "#757575";
      ctx.fillText("Completed", centerX, centerY + 10);
    } else {
      ctx.fillText(`${pendingPercentage}%`, centerX, centerY - 10);
      ctx.font = "10px Inter, sans-serif";
      ctx.fillStyle = "#757575";
      ctx.fillText("Pending", centerX, centerY + 10);
    }
  }, [completed, pending, total]);

  if (total === 0) {
    return (
      <div className="task-graph placeholder">
        <div className="placeholder-content">
          <span className="placeholder-icon">📋</span>
          <p className="placeholder-text">No tasks available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="task-graph">
      <div className="pie-chart-container">
        <canvas
          ref={canvasRef}
          width={200}
          height={200}
          className="pie-chart"
        ></canvas>
      </div>

      <div className="graph-legend">
        <div className="legend-item">
          <div className="color-indicator completed"></div>
          <span>Completed</span>
        </div>
        <div className="legend-item">
          <div className="color-indicator pending"></div>
          <span>Pending</span>
        </div>
      </div>

      <div className="task-stats">
        <div className="stat-item">
          <span className="stat-value">{total}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{completed}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{pending}</span>
          <span className="stat-label">Pending</span>
        </div>
      </div>
    </div>
  );
};

export default TaskGraph;
