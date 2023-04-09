import React from "react";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const TaskCompletionBarChart = ({ Task_Completed }) => {
  console.log(Task_Completed);
  const [Completed,setCompletd] = useState(false);
  // Fictional dataset for bar chart
  const data = [
    { day: "Day-1", completed: { Task_Completed } ? "true" : "false" },
    { day: "Day-2", completed: { Task_Completed } ? "true" : "false" },
    { day: "Day-3", completed: { Task_Completed } ? "true" : "false" },
    { day: "Day-4", completed: { Task_Completed } ? "true" : "false" },
  ];

  return (
    <div className="col-md-12">
      <BarChart width={800} height={400} data={data}>
        <CartesianGrid />
        <XAxis dataKey="day" type="category" />
        <YAxis />
        <Tooltip
          formatter={(value) =>
            value ? "Completed: true" : "Completed: false"
          }
          labelFormatter={(label) => `Day: ${label}`}
        />
        <Legend />
        <Bar dataKey="completed" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default TaskCompletionBarChart;
