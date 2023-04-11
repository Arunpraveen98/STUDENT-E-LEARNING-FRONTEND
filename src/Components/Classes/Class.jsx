import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Class.css";
import { Button, Modal } from "react-bootstrap";
import {
  ArrowCircleRight,
  ArrowDownward,
  ArrowUpward,
} from "@mui/icons-material";
import EastIcon from "@mui/icons-material/East";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Class = () => {
  // --------------------------------------
  //? React Hooks...
  const [showModal, setShowModal] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [InitialContent, setInitialContent] = useState(true);
  const [Loader, setLoader] = useState(true);
  const [Daily_Content, setDaily_Content] = useState([]);
  const [ClassContents, setClassContents] = useState([]);
  const [github_Url, setGithub_Url] = useState("");
  const [Deploy_Url, setDeploy_Url] = useState("");
  const [Spinner, setSpinner] = useState(true);
  // --------------------------------------
  //? React-router-dom Hook...
  const navigate = useNavigate();
  // --------------------------------------
  //? Student Object...
  const Student = window.localStorage.getItem("Student_Data");
  const Student_Data = JSON.parse(Student);
  // --------------------------------------
  //? React toastify for Success...
  const success = (message) => {
    toast.success(`${message}`, {
      position: "top-center",
      autoClose: true,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: 1,
      theme: "dark",
    });
  };
  // --------------------------------------
  //? Async Function to fetch the class contents Data...
  async function Get_Class_Contents() {
    try {
      const Class_Contents = await axios.get(
        `${process.env.REACT_APP_EXPRESS_SERVER}/Class-Contents`,
        // "http://localhost:8000/Class-Contents",
        {
          headers: {
            Authorization: Student_Data.Student_Token,
          },
        }
      );
      // console.log(Class_Contents.data.message);
      // --------------------------------------
      setClassContents(Class_Contents.data);
      setLoader(false);
      // --------------------------------------
    } catch (error) {
      console.log(error);
      // --------------------------------------
      // alert(error);
      navigate("/");
      // --------------------------------------
    }
  }
  // --------------------------------------
  //? UseEffect Hook...
  useEffect(() => {
    Get_Class_Contents();
  }, []);
  // --------------------------------------
  //? Daily Content Function ...
  const set_daily_content = async (index) => {
    try {
      if (ClassContents.length !== 0) {
        const DailyContent = ClassContents.slice(index, index + 1);
        setDaily_Content(DailyContent);
        setInitialContent(false);
        setLoader(false);
        // console.log(DailyContent);
        // console.log(DailyContent[0].id);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  // --------------------------------------
  //? Posting the Tasks Activites...
  const Post_Task_Activites = async (Task_Name, Task_Topic, Day) => {
    // --------------------------------------
    try {
      // --------------------------------------
      //? Inbuilt Date function...
      const currentDate = new Date();
      const ISTDateString = currentDate.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      // --------------------------------------
      setSpinner(false);
      // --------------------------------------
      const Post_Task = await axios.post(
        `${process.env.REACT_APP_EXPRESS_SERVER}/Task-Submission`,
        // "http://localhost:8000/Task-Submission",
        {
          Current_Date: ISTDateString,
          Task_Name: Task_Name,
          Task_Topic: Task_Topic,
          GitHub_Url: github_Url,
          Deployed_Url: Deploy_Url,
          Student_Email: Student_Data.Student_Email,
          Task_Completed: "true",
          Day: Day,
        },
        {
          headers: {
            Authorization: Student_Data.Student_Token,
          },
        }
      );
      // console.log(Post_Task);
      // alert("Task Submitted");
      // --------------------------------------
      success("👍Task Submitted");
      setGithub_Url("");
      setDeploy_Url("");
      setSpinner(true);
      // --------------------------------------
    } catch (error) {
      console.log(error);
    }
  };

  // --------------------------------------
  //? OnClick Toggle Functions...
  const handleJoinClass = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleToggleTask = () => {
    setShowTask(!showTask);
  };
  // --------------------------------------
  return (
    <div className="container">
      <div className="component-title">Class</div>
      {/* --------------------- */}
      {/* Class Content */}

      <div className="row">
        <div className="col-md-7 mb-4">
          {/* --------------------- */}

          {/* JOIN CLASS */}
          <div className="card p-2">
            <div className="row">
              <div className="col-md-10">
                <h5 className="card-title join-class">
                  Join the Class on time
                </h5>
              </div>
              <div className="col-md-2">
                <Button
                  className="join-btn"
                  variant="primary"
                  onClick={handleJoinClass}
                >
                  Join Class
                </Button>
              </div>
            </div>
          </div>
          {/* END OF JOIN CLASS */}

          {/* --------------------- */}
          {Loader ? (
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
          ) : (
            <>
              {InitialContent ? (
                <div className="row">
                  <div className="col-md-12 mt-4">
                    <div className="card">
                      {/* --------------------- */}
                      <div className="card-header">
                        <h5 className="card-title">
                          No session title available. Click the Day to view the
                          Content <ArrowCircleRight />{" "}
                        </h5>
                        <p className="card-text">
                          Class schedule is not updated
                        </p>
                      </div>
                      {/* --------------------- */}
                      <div className="card-body">
                        <h3 className="card-title">Contents:</h3>
                        <p className="card-text">No content available</p>
                        <div>
                          <h3 className="card-title">Pre-read:</h3>
                          <p className="card-text">No preread available</p>
                        </div>
                      </div>
                      {/* --------------------- */}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* CLASS CONTENTS */}
                  {Daily_Content.map((item) => {
                    return (
                      <>
                        <div className="row" key={item._id}>
                          <div className="col-md-12 mt-4">
                            {/* --------------------- */}
                            <div className="card">
                              {/* --------------------- */}
                              <div className="card-header p-3">
                                <h5 className="card-title">{item.Day_Title}</h5>
                                <p className="card-text content-date">
                                  {item.Date_and_Time}
                                </p>
                              </div>
                              <div className="card-body">
                                <div>
                                  <h3 className="card-title">Contents:</h3>
                                  {/* --------------------- */}
                                  <div>
                                    <p className="card-text">
                                      <EastIcon /> {item.Contents[0]}
                                    </p>

                                    <p className="card-text">
                                      <EastIcon /> {item.Contents[1]}
                                    </p>

                                    <p className="card-text">
                                      <EastIcon /> {item.Contents[2]}
                                    </p>

                                    <p className="card-text">
                                      <EastIcon /> {item.Contents[3]}
                                    </p>

                                    <p className="card-text">
                                      <EastIcon /> {item.Contents[4]}
                                    </p>

                                    <p className="card-text">
                                      <EastIcon /> {item.Contents[5]}
                                    </p>
                                  </div>
                                  {/* --------------------- */}
                                  <div>
                                    <h3 className="card-title mt-1">
                                      Pre-read:
                                    </h3>
                                    <p className="card-text pre-read-content">
                                      {item.Pre_read_url}
                                    </p>
                                  </div>
                                  {/* --------------------- */}
                                </div>
                              </div>
                            </div>
                            {/* --------------------- */}
                          </div>

                          {/* TASK ACTIVITIES   */}

                          <div className="col-md-12 task-div">
                            <div className="card">
                              <div className="card-body">
                                <div className="d-flex align-items-center">
                                  {/* --------------------- */}
                                  <div className="col-lg-11">
                                    <h5 className="card-title mb-0">
                                      Task Activities:
                                    </h5>

                                    <p className="card-text task-activity-topic">
                                      {item.Task_Activity_Topic}
                                    </p>
                                  </div>
                                  <div className="col-sm-1 col-xs-1">
                                    <Button
                                      variant="link"
                                      className="arrow-btn"
                                      onClick={handleToggleTask}
                                    >
                                      {showTask ? (
                                        <ArrowUpward />
                                      ) : (
                                        <ArrowDownward />
                                      )}
                                    </Button>
                                  </div>
                                  {/* --------------------- */}
                                </div>
                                {showTask && (
                                  <div className="row">
                                    <div className="col-md-12">
                                      <form>
                                        {/* --------------------- */}
                                        <div className="form-group mt-3">
                                          <label htmlFor="githubUrl">
                                            GitHub URL:
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            value={github_Url}
                                            onChange={(event) =>
                                              setGithub_Url(event.target.value)
                                            }
                                            id="githubUrl"
                                            placeholder="ex : https://www.example.com"
                                          />
                                        </div>
                                        {/* --------------------- */}
                                        <div className="form-group mt-3">
                                          <label htmlFor="deploymentUrl">
                                            Deployment URL:
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            value={Deploy_Url}
                                            onChange={(event) =>
                                              setDeploy_Url(event.target.value)
                                            }
                                            id="deploymentUrl"
                                            placeholder="ex : https://www.example.com"
                                          />
                                        </div>
                                        {/* --------------------- */}
                                      </form>
                                      {/* --------------------- */}
                                      <div className="mt-2 d-flex justify-content-center">
                                        {/* --------------------- */}
                                        <button
                                          type="submit"
                                          value="SUBMIT"
                                          className="btn btn-success"
                                          onClick={() => {
                                            if (
                                              github_Url !== "" &&
                                              Deploy_Url !== ""
                                            ) {
                                              Post_Task_Activites(
                                                item.Day_Title,
                                                item.Task_Activity_Topic,
                                                item.Day
                                              );
                                            }
                                          }}
                                          disabled={
                                            github_Url === "" ||
                                            Deploy_Url === ""
                                          }
                                        >
                                          {Spinner ? (
                                            "SUBMIT"
                                          ) : (
                                            <div className="spinner-div">
                                              <div className="spinner"></div>
                                            </div>
                                          )}
                                        </button>
                                        {/* --------------------- */}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </>
              )}
            </>
          )}
          {/* --------------------- */}
        </div>
        {/* --------------------- */}

        {/* Session Roadmap */}

        <div className="col-md-5 roadmap-div">
          <div className="card">
            <div className="card-body">
              {/* --------------------- */}
              <div className="card-header">
                <h5 className="card-title">Session Roadmap</h5>
              </div>
              {/* --------------------- */}
              <div className="d-flex flex-wrap m-2 ">
                {/* --------------------- */}
                <Button
                  className="session-button"
                  onClick={() => set_daily_content(0)}
                >
                  Day-1
                </Button>
                <div className="session-arrow-btn">
                  <EastIcon />
                </div>
                {/* --------------------- */}
                <Button
                  className="session-button"
                  onClick={() => set_daily_content(1)}
                >
                  Day-2
                </Button>
                <div className="session-arrow-btn">
                  <EastIcon />
                </div>
                {/* --------------------- */}
                <Button
                  className="session-button"
                  onClick={() => set_daily_content(2)}
                >
                  Day-3
                </Button>
                <div className="session-arrow-btn">
                  <EastIcon />
                </div>
                {/* --------------------- */}
                <Button
                  className="session-button"
                  onClick={() => set_daily_content(3)}
                >
                  Day-4
                </Button>
                <div className="session-arrow-btn">
                  <EastIcon />
                </div>
                {/* --------------------- */}
                <Button
                  className="session-button"
                  onClick={() => set_daily_content(4)}
                >
                  Day-5
                </Button>
                {/* --------------------- */}
                <Button
                  className="session-button"
                  onClick={() => set_daily_content(5)}
                >
                  Day-6
                </Button>
                <div className="session-arrow-btn">
                  <EastIcon />
                </div>
                {/* --------------------- */}
                <Button
                  className="session-button"
                  onClick={() => set_daily_content(6)}
                >
                  Day-7
                </Button>
                <div className="session-arrow-btn">
                  <EastIcon />
                </div>
                {/* --------------------- */}
                <Button
                  className="session-button"
                  onClick={() => set_daily_content(7)}
                >
                  Day-8
                </Button>
                <div className="session-arrow-btn">
                  <EastIcon />
                </div>
                {/* --------------------- */}
                <Button
                  className="session-button"
                  onClick={() => set_daily_content(8)}
                >
                  Day-9
                </Button>
                <div className="session-arrow-btn">
                  <EastIcon />
                </div>
                {/* --------------------- */}
                <Button
                  className="session-button day-10-btn"
                  onClick={() => set_daily_content(9)}
                >
                  Day-10
                </Button>
                {/* --------------------- */}
              </div>
            </div>
          </div>
        </div>
        {/* END OF SESSION ROADMAP */}

        {/* --------------------- */}
      </div>
      {/* END OF CLASS ROW */}
      {/* --------------------- */}

      {/* Popup Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        {/* --------------------- */}
        <Modal.Header closeButton>
          <Modal.Title>Join Zoom Meeting</Modal.Title>
        </Modal.Header>
        {/* --------------------- */}
        {Daily_Content.map((zoom) => {
          return (
            <>
              {/* --------------------- */}
              <Modal.Body className="zoom-link" key={zoom.id}>
                <a href={zoom.Zoom_Link}>{zoom.Zoom_Link}</a>
              </Modal.Body>
              {/* --------------------- */}
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
                <Button variant="primary">
                  <a className="join-btn-link" href={zoom.Zoom_Link}>
                    Join
                  </a>
                </Button>
              </Modal.Footer>
              {/* --------------------- */}
            </>
          );
        })}
      </Modal>
      {/*END OF Popup Modal */}

      {/* --------------------- */}

      {/* END OF CONTAINER ROW */}
      {/* --------------------- */}

      {/* --------------------- */}
    </div>
  );
};

export default Class;
