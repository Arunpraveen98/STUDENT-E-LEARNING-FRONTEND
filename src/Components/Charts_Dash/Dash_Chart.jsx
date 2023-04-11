import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
// ------------------------------
const TaskCompletionBarChart = () => {
  const [Loader2, setLoader2] = useState(true);
  const [data, setData] = useState([
    { day: "Day-1", completed: "false" },
    { day: "Day-2", completed: "false" },
    { day: "Day-3", completed: "false" },
    { day: "Day-4", completed: "false" },
    { day: "Day-5", completed: "false" },
    { day: "Day-6", completed: "false" },
    { day: "Day-7", completed: "false" },
    { day: "Day-8", completed: "false" },
    { day: "Day-9", completed: "false" },
    { day: "Day-10", completed: "false" },
  ]);
  // ------------------------------
  //? Student Object...
  const Student = window.localStorage.getItem("Student_Data");
  const Student_Data = JSON.parse(Student);
  // ------------------------------
  //? Async function to get the submitted tasks ...
  const Get_Submitted_Task = async () => {
    try {
      const Get_Task_Data = await axios.get(
        `${process.env.REACT_APP_EXPRESS_SERVER}/Submitted-Task?Email=${Student_Data.Student_Email}`,
        // `http://localhost:8000/Submitted-Task?Email=${Student_Data.Student_Email}`,
        {
          headers: {
            Authorization: Student_Data.Student_Token,
          },
        }
      );
      //  -----------------------------------------
      //? Finding the matching document ...
      const newData = data.map((value) => {
        const dayNumber = parseInt(value.day.split("-")[1]);
        const taskData = Get_Task_Data.data.find(
          (task) => task.Day == dayNumber
        );
        return {
          day: value.day,
          completed: taskData ? true : false, //? Updated to boolean value
        };
      });
      //  -----------------------------------------
      setData(newData);
      setLoader2(false);
      //  -----------------------------------------
    } catch (error) {
      console.log(error);
    }
  };

  //  -----------------------------------------
  //? UseEffect on Initial Mounting...
  useEffect(() => {
    Get_Submitted_Task();
  }, []);
  // ------------------------------
  return (
    <>
      {Loader2 ? (
        <div className="col-md-12">
          <div className="loader-div">
            <div className="loader">
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
              <div className="bar4"></div>
              <div className="bar5"></div>
              <div className="bar6"></div>
              <div className="bar7"></div>
              <div className="bar8"></div>
              <div className="bar9"></div>
              <div className="bar10"></div>
              <div className="bar11"></div>
              <div className="bar12"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="col-md-12 mt-5">
          <BarChart width={800} height={400} data={data}>
            <CartesianGrid />
            <XAxis dataKey="day" type="category" />
            <YAxis />
            <Tooltip
              formatter={(value) => (value ? "true" : "false")}
              labelFormatter={(label) => `Day: ${label}`}
            />
            <Legend />
            <Bar dataKey="completed" fill="#8884d8" />
          </BarChart>
        </div>
      )}
    </>
  );
};

export default TaskCompletionBarChart;
