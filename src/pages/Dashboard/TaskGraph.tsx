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
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // No data case
    if (total === 0) {
      drawEmptyPieChart(ctx, canvas.width, canvas.height);
      return;
    }

    // Draw pie chart
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Completed tasks slice
    const completedAngle = (completed / total) * 2 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, 0, completedAngle);
    ctx.fillStyle = "#4caf50"; // success-color
    ctx.fill();

    // Pending tasks slice
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, completedAngle, 2 * Math.PI);
    ctx.fillStyle = "#ff9800"; // warning-color
    ctx.fill();

    // Draw a white circle in the middle for donut effect
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();

    // Add percentages in the middle
    const completedPercentage = Math.round((completed / total) * 100);
    const pendingPercentage = 100 - completedPercentage;

    ctx.font = "bold 14px Inter, sans-serif";
    ctx.fillStyle = "#2c3e50"; // heading-color
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if (completedPercentage > 0) {
      ctx.fillText(`${completedPercentage}%`, centerX, centerY - 10);
      ctx.font = "10px Inter, sans-serif";
      ctx.fillStyle = "#757575"; // text-muted
      ctx.fillText("Completed", centerX, centerY + 10);
    } else {
      ctx.fillText(`${pendingPercentage}%`, centerX, centerY - 10);
      ctx.font = "10px Inter, sans-serif";
      ctx.fillStyle = "#757575"; // text-muted
      ctx.fillText("Pending", centerX, centerY + 10);
    }
  }, [completed, pending, total]);

  const drawEmptyPieChart = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Draw empty circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#f0f3f8"; // bg-light
    ctx.fill();

    // Draw text
    ctx.font = "bold 14px Inter, sans-serif";
    ctx.fillStyle = "#757575"; // text-muted
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("No tasks yet", centerX, centerY);
  };

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
