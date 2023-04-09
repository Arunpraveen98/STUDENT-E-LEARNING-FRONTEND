import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Task_Submission.css";
import { useNavigate } from "react-router-dom";

const Task_Submission = () => {
  const [view_Task, setView_Task] = useState(false);
  const [InitialContent, setInitialContent] = useState(true);
  const [Loader, setLoader] = useState(true);
  const [Submitted_Task, setSubmitted_Task] = useState([]);
  const [Selected_Task, setSelected_Task] = useState([]);
  const navigate = useNavigate();
  const Student = window.localStorage.getItem("Student_Data");
  const Student_Data = JSON.parse(Student);
  //  -----------------------------------------
  const Get_Submitted_Task = async () => {
    try {
      const Get_Task_Data = await axios.get(
        `http://localhost:8000/Submitted-Task?Email=${Student_Data.Student_Email}`,
        {
          headers: {
            Authorization: Student_Data.Student_Token,
          },
        }
      );
      console.log(Get_Task_Data.data.length);
      if (Get_Task_Data.data.length === 0) {
        // alert("Tasks not Submitted");
        // setInitialContent(true);
        setLoader(false);
      } else {
        setLoader(false);
        setInitialContent(false);
        // setLoader(true);
        // setLoader(false);
        setSubmitted_Task(Get_Task_Data.data);
      }
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };
  //  -----------------------------------------
  useEffect(() => {
    Get_Submitted_Task();
  }, []);
  //  -----------------------------------------

  const View_Selected_Task = (selected_task_id) => {
    const Get_Selected_Task = Submitted_Task.filter(
      (item) => item._id === selected_task_id
    );
    console.log(Get_Selected_Task);
    setSelected_Task(Get_Selected_Task);
    setView_Task(true);
  };
  //  -----------------------------------------
  return (
    <>
      <div className="container">
        <div className="component-title">Tasks</div>
        <div className="row">
          {Loader ? (
            <div className="loader-div">
              <div class="loader">
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
                <div class="bar4"></div>
                <div class="bar5"></div>
                <div class="bar6"></div>
                <div class="bar7"></div>
                <div class="bar8"></div>
                <div class="bar9"></div>
                <div class="bar10"></div>
                <div class="bar11"></div>
                <div class="bar12"></div>
              </div>
            </div>
          ) : (
            <>
              {/* --------------------- */}
              {InitialContent ? (
                <div className="col-md-7">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-title">
                        No Tasks to display. Complete the Daily Tasks.
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-md-7">
                  {Submitted_Task.map((task, index) => {
                    return (
                      <div className="card mt-2" key={index}>
                        <div className="card-header task-header">
                          SUBMITTED-TASK{" "}
                          <span className="task-date">{task.Current_Date}</span>
                        </div>
                        <div className="card-body">
                          <div className="col-md-12">
                            <div className="row">
                              <div className="col-md-7">
                                <div className="card-title">
                                  {task.Task_Name}
                                </div>
                              </div>
                              <div className="col-md-5">
                                <div className="card-title d-flex justify-content-center">
                                  {Student_Data.Student_Name}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className="card-text task-topic">
                              TOPIC:
                              <span className="task-topic-heading">
                                {task.Task_Topic}
                              </span>{" "}
                            </p>
                          </div>
                          <div className="btn-groups">
                            <button
                              onClick={() => View_Selected_Task(task._id)}
                              className="task-btn view-btn"
                            >
                              <span className="task-btn-content">View</span>
                            </button>
                            <button
                              onClick={() => setView_Task(false)}
                              className="task-btn close-btn"
                            >
                              <span className="task-btn-content "> Close</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {/* --------------------- */}

              {view_Task ? (
                <div className="col-md-5">
                  {Selected_Task.map((task) => {
                    return (
                      <div className="card mt-2" key={task._id}>
                        <div className="card-header task-header">
                          {task.Task_Name}{" "}
                          <span className="task-date">{task.Current_Date}</span>
                        </div>
                        <div className="card-body">
                          <div className="card-title task-answers">
                            Answers :{" "}
                            <span className="task-graded">
                              Yet to be Graded
                            </span>
                          </div>
                          <div className="task-url">
                            <div className="card-url">
                              <span className="github-url">GITHUB-URL:</span>
                              <a href={task.GitHub_Url}>{task.GitHub_Url}</a>
                            </div>
                            <div className="card-url">
                              <span className="deploy-url">DEPLOY-URL:</span>
                              <a href={task.Deployed_Url}>
                                {task.Deployed_Url}
                              </a>
                            </div>
                          </div>
                          <div className="task-warning">
                            <span className="warning"> Warning: </span>1 mark
                            will be deducted from your total score if you're
                            failed to submit the task within the deadline
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
            </>
          )}
        </div>
        {/* END OF CONTAINER ROW */}
      </div>
      {/* END OF CONTAINER */}
    </>
  );
};

export default Task_Submission;