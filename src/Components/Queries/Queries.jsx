import React, { useEffect, useState } from "react";
import "./Queries.css";
import { useFormik } from "formik";
import axios from "axios";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Key } from "@mui/icons-material";
const Queries = () => {
  const [InitialContent, setInitialContent] = useState(true);
  const [Loader, setLoader] = useState(true);
  const [AssignedQuery, setAssignedQuery] = useState([]);
  const Student = window.localStorage.getItem("Student_Data");
  const Student_Data = JSON.parse(Student);
  const My_Formik = useFormik({
    initialValues: {
      Topic: "",
      Language: "",
      QueryTitle: "",
      QueryDescription: "",
      AvailableTimeFrom: "",
      AvailableTimeTo: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.Topic) {
        errors.Topic = "Please select a topic";
      }
      if (!values.Language) {
        errors.Language = "Please select a language";
      }
      if (!values.QueryTitle) {
        errors.QueryTitle = "Please enter query title";
      }
      if (!values.QueryDescription) {
        errors.QueryDescription = "Please enter query description";
      }
      if (!values.AvailableTimeFrom) {
        errors.AvailableTimeFrom = "Please select available time";
      }
      if (!values.AvailableTimeTo) {
        errors.AvailableTimeTo = "Please select available time";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
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
        const Post_Query = await axios.post(
          "http://localhost:8000/Create-Query",
          {
            ...values,
            Current_Date: ISTDateString,
            Student_Email: Student_Data.Student_Email,
          },
          {
            headers: {
              Authorization: Student_Data.Student_Token,
            },
          }
        );
        console.log(Post_Query);
        alert("Query Created Success");
        My_Formik.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });

  async function Get_Query() {
    try {
      const Get_Assigned_Query = await axios.get(
        `http://localhost:8000/Assigned-Query?Email=${Student_Data.Student_Email}`,
        {
          headers: {
            Authorization: Student_Data.Student_Token,
          },
        }
      );
      if (Get_Assigned_Query.data.length === 0) {
        // alert("No Query to display.Create a new Query");
        setLoader(false);
      } else {
        setLoader(false);
        setInitialContent(false);
        setAssignedQuery(Get_Assigned_Query.data);
      }
      console.log(Get_Assigned_Query.data);
      console.log(AssignedQuery);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    Get_Query();
  }, []);
  return (
    <div>
      {" "}
      <div className="container">
        <div className="component-title">Queries</div>
        <div className="row">
          <div className="col-md-6">
            <div className="card query-card-bg">
              <div className="card-body">
                <form onSubmit={My_Formik.handleSubmit}>
                  <h5 className="card-title query-title">Topic :</h5>
                  <div className="form-group">
                    <select
                      className="form-control"
                      value={My_Formik.values.Topic}
                      onChange={My_Formik.handleChange}
                      name="Topic"
                    >
                      <option value="">⏪ -select topic- ⏩</option>
                      <option value="html">HTML</option>
                      <option value="css">CSS</option>
                      <option value="javascript">JavaScript</option>
                      <option value="react">React.js</option>
                      <option value="mongodb">MongoDB</option>
                      <option value="express">Express</option>
                      <option value="node">Node</option>
                    </select>
                    {
                      <span
                        style={{
                          color: "red",
                          fontSize: "10px",
                          fontFamily: "cursive",
                        }}
                      >
                        {My_Formik.errors.Topic}
                      </span>
                    }
                  </div>
                  <h5 className="card-title query-title">Language :</h5>
                  <div className="form-group">
                    <select
                      className="form-control"
                      value={My_Formik.values.Language}
                      onChange={My_Formik.handleChange}
                      name="Language"
                    >
                      <option value="">⏪ -select language- ⏩</option>
                      <option value="english">English</option>
                      <option value="tamil">Tamil</option>
                    </select>
                    {
                      <span
                        style={{
                          color: "red",
                          fontSize: "10px",
                          fontFamily: "cursive",
                        }}
                      >
                        {My_Formik.errors.Language}
                      </span>
                    }
                  </div>
                  <h5 className="card-title query-title">Queries :</h5>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Title"
                      value={My_Formik.values.QueryTitle}
                      onChange={My_Formik.handleChange}
                      name="QueryTitle"
                    />
                    {
                      <span
                        style={{
                          color: "red",
                          fontSize: "10px",
                          fontFamily: "cursive",
                        }}
                      >
                        {My_Formik.errors.QueryTitle}
                      </span>
                    }
                  </div>
                  <div className="form-group mt-2">
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Description"
                      value={My_Formik.values.QueryDescription}
                      onChange={My_Formik.handleChange}
                      name="QueryDescription"
                    ></textarea>
                    {
                      <span
                        style={{
                          color: "red",
                          fontSize: "10px",
                          fontFamily: "cursive",
                        }}
                      >
                        {My_Formik.errors.QueryDescription}
                      </span>
                    }
                  </div>
                  <h5 className="card-title query-title">Available Time :</h5>
                  <div className="form-group">
                    <div className="row">
                      <div className="col">
                        <input
                          type="time"
                          className="form-control"
                          placeholder="From"
                          value={My_Formik.values.AvailableTimeFrom}
                          onChange={My_Formik.handleChange}
                          name="AvailableTimeFrom"
                        />
                        {
                          <span
                            style={{
                              color: "red",
                              fontSize: "10px",
                              fontFamily: "cursive",
                            }}
                          >
                            {My_Formik.errors.AvailableTimeFrom}
                          </span>
                        }
                      </div>
                      <div className="col">
                        <input
                          type="time"
                          className="form-control"
                          placeholder="To"
                          value={My_Formik.values.AvailableTimeTo}
                          onChange={My_Formik.handleChange}
                          name="AvailableTimeTo"
                        />
                        {
                          <span
                            style={{
                              color: "red",
                              fontSize: "10px",
                              fontFamily: "cursive",
                            }}
                          >
                            {My_Formik.errors.AvailableTimeTo}
                          </span>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 d-flex justify-content-center mt-2">
                    <button
                      type="submit"
                      value={"Create"}
                      className="btn btn-success"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {Loader ? (
            <div className="loader-div col-md-6">
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
              {InitialContent ? (
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-title">
                        No Queries to display. Create a new Query.
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-md-6">
                  {AssignedQuery.map((Query) => {
                    return (
                      <div className="card" key={Query._id}>
                        <div className="card-header">
                          <p className="card-text query-title">
                            Topic :
                            <span className="query-content">
                              {" "}
                              {Query.Topic}
                            </span>
                          </p>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="card-text query-title">
                                Created at :
                                <span className="query-content">
                                  {" "}
                                  {Query.Current_Date}
                                </span>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="card-text query-title">
                                Assigned to :
                                <span className="query-content">
                                  {" "}
                                  Arun Praveen
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="row mt-1">
                            <div className="col-md-12">
                              <div className="card-title query-title">
                                DESCRIPTION :
                              </div>
                              <div className="card-text query-content">
                                {Query.QueryDescription}
                              </div>
                              <div className="card-text query-title">
                                Preferred Language :
                                <span className="query-content">
                                  {" "}
                                  {Query.Language}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Queries;